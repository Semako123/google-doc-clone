import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { EditorContext } from "../context/EditorProvider";
import Ribbon from "./Ribbon";
import useAuth from "../hooks/useAuth";
import Cursor from "../components/Cursor";

const DURATION_MS = 2000;

const EDITOR_OPTIONS = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const TextEditor = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const [cursors, setCursors] = useState({});

  // states
  const { quill, setQuill, docName, setDocName, socket, setSocket } =
    useContext(EditorContext);

  //save every 2 seconds
  useEffect(() => {
    if (quill == null || socket == null) return;
    const uid = user ? user.uid : null;
    const save_doc = () => {
      socket.emit("save-doc", [quill.getContents(), uid]);
    };

    const interval = setInterval(save_doc, DURATION_MS);

    return () => {
      clearInterval(interval);
    };
  }, [quill, socket, user]);

  //Load document
  useEffect(() => {
    if (socket == null || quill == null || id == null) return;
    socket.emit("get-document", id);

    socket.once("load-document", (document) => {
      quill.setContents(document.data);
      setDocName(document.name);
      quill.enable();
    });
  }, [socket, quill, id, setDocName]);

  //Setup for socket
  useEffect(() => {
    const s = io("https://google-doc-clone-cwqe.onrender.com");
    setSocket(s);
    s.on("connect", () => {
      // console.log(s.id);
    });
    return () => {
      s.disconnect();
    };
  }, [setSocket]);

  //setup for editor and wrapper
  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper == null) return;

      wrapper.innerHTML = "";

      const container = document.createElement("div");
      wrapper.append(container);
      const q = new Quill(container, {
        modules: { toolbar: EDITOR_OPTIONS },
        theme: "snow",
      });
      setQuill(q);
      q.disable();
    },
    [setQuill]
  );

  //send doc-changes
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("change-doc", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, socket]);

  //Update doc-changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //Update Doc Name
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handler = (name) => {
      setDocName(name);
    };

    socket.emit("name-change", docName);
    socket.on("update-name", handler);

    return () => {
      socket.off("update-name", handler);
    };
  }, [quill, docName, socket, setDocName]);

  //Broadcast user cursor position on selector/selection change
  useEffect(() => {
    if (quill == null || socket == null || user == null) return;

    const handler = (range, oldRange, source) => {
      const id = user.photoURL;
      const name = user.displayName.split(" ")[0];
      const currPosition = quill.getSelection();
      if (source !== "user") return;
      socket.emit("send-position", [currPosition, id, name]);
    };

    quill.on("selection-change", handler);

    return () => {
      quill.off("selection-change", handler);
    };
  }, [socket, quill, user]);

  //Broadcast user cursor position on text change
  useEffect(() => {
    if (quill == null || socket == null || user == null) return;

    const handler = (delta, oldDelta, source) => {
      const currPosition = quill.getSelection();
      const id = user.photoURL;
      const name = user.displayName.split(" ")[0];
      if (source !== "user") return;
      socket.emit("send-position", [currPosition, id, name]);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill, user]);

  //Track collaborators cursor position
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handler = ([position, id, name]) => {
      setCursors((prevState) => ({ ...prevState, [id]: [position, name] }));
    };

    socket.on("receive-position", handler);

    return () => {
      socket.off("receive-position", handler);
    };
  }, [socket, quill]);

  return (
    <div>
      <Ribbon />
      {Object.keys(cursors).map((id) => (
        <Cursor
          key={id}
          position={cursors[id][0]}
          name={cursors[id][1]}
          url={id}
        />
      ))}
      <div className="wrapper" ref={wrapperRef}></div>
    </div>
  );
};

export default TextEditor;
