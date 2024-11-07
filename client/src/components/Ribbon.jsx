import React, { useContext } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";
import { ModalContext } from "../context/ModalProvider";
import useAuth from "../hooks/useAuth";
import placeHolderImage from "../assets/placeholder.jpg";
import { saveAs } from "file-saver";
import * as quillToWord from "quill-to-word";
import { EditorContext } from "../context/EditorProvider";
import toast from "react-hot-toast";

export default function Ribbon() {
  const { setIsLogOpen, setIsRecentOpen } = useContext(ModalContext);
  const { user, logout } = useAuth();
  const { quill, docName, setDocName, socket } = useContext(EditorContext);

  const updateDocName = (e) => {
    setDocName(e.target.value);
  };

  const handleOpenLogin = () => {
    setIsLogOpen((prevState) => !prevState);
  };

  const handleExport = async () => {
    if (quill === null) return;

    const delta = quill.getContents();

    const quillToWordConfig = {
      exportAs: "blob",
    };
    const docAsBlob = await quillToWord.generateWord(delta, quillToWordConfig);
    saveAs(docAsBlob, docName);
    toast.success(`Your file ${docName} has been succecssfully exported`, {
      style: {
        fontSize: "12px",
        color: "GrayText",
      },
    });
  };

  const handleSave = () => {
    if (!user) {
      toast(`Login to save your file`, {
        icon: "👀",
        style: {
          background: "#FFA07A",
          fontSize: "12px",
          color: "#fff",
        },
      });
      return;
    }
    const uid = user ? user.uid : null;
    socket.emit("save-doc", [quill.getContents(), uid]);
    toast.success("Your file has been saved", {
      style: {
        fontSize: "12px",
        color: "GrayText",
      },
    });
  };

  const handlePrint = async () => {
    if (quill === null) return;

    window.print();
  };

  return (
    <div className=" mx-3 py-2 flex">
      <div className="flex items-center hover:cursor-pointer">
        <img src={logo} alt="Docs logo" className="w-10" />
      </div>
      <div className="flex flex-col">
        <input
          className="bg-[#f9fbfd] h-6 border border-transparent rounded text-slate-600 font-medium hover:border-slate-600 px-1 outline-none focus:border-[#0B57D0] focus:border-2 text-lg mb-[1px]"
          type="text"
          name=""
          id=""
          value={docName}
          onChange={updateDocName}
        />
        <div className="flex">
          <Button
            variant="option"
            onClick={() => {
              setIsRecentOpen(true);
            }}
          >
            Recents
          </Button>
          <Button variant="option" onClick={handleSave}>
            Save
          </Button>
          <Button variant="option" onClick={handleExport}>
            Export
          </Button>
          <Button variant="option" onClick={handlePrint}>
            Print
          </Button>
        </div>
      </div>
      <div className="flex items-center ml-auto mr-3 gap-x-3">
        {user ? (
          <Button
            onClick={() => {
              logout();
            }}
          >
            Sign out
          </Button>
        ) : (
          <Button onClick={handleOpenLogin}>Login</Button>
        )}
        {/* <h2 className="mr-3">Welcome back Anonymous</h2> */}
        <img
          src={user ? user.photoURL : placeHolderImage}
          alt=""
          className="border-2  rounded-full w-10 h-10"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
