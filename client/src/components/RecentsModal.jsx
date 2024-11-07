import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { ModalContext } from "../context/ModalProvider";
import Button from "../components/Button";
import { EditorContext } from "../context/EditorProvider";
import useAuth from "../hooks/useAuth";
import DocCard from "../components/DocCard";
import { Link } from "react-router-dom";

const RecentsModal = () => {
  const { isRecentOpen, setIsRecentOpen } = useContext(ModalContext);
  const { socket } = useContext(EditorContext);
  const { user } = useAuth();
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    setRecents([]);
    if (!user || !socket) return;
    socket.emit("fetch-recent", user.uid);
    socket.on("receive-recent", (recents) => {
      setRecents(recents);
    });
  }, [socket, user, isRecentOpen]);

  return (
    <div>
      <Modal isOpen={isRecentOpen} closeTimeoutMS={300}>
        <div className="flex mb-4 p-4">
          <h2 className="font-medium text-lg text-slate-600">
            Recent Documents
          </h2>
          <Button
            onClick={() => {
              setIsRecentOpen(false);
            }}
            className="ml-auto"
          >
            Close
          </Button>
        </div>
        <div className="flex gap-20 p-2 flex-wrap justify-center ">
          {!user && (
            <h2 className="text-3xl text-slate-700 font-semibold">
              Login to view "Recents"
            </h2>
          )}
          {recents &&
            recents.map((doc) => (
              <Link to={`/documents/${doc._id}`} target="_blank" key={doc._id}>
                <DocCard name={doc.name} _id={doc._id} />
              </Link>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default RecentsModal;
