import React, { useContext } from "react";
import Modal from "react-modal";
import { ModalContext } from "../context/ModalProvider";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import login_png from "../assets/login_logo.jpg";
import google_png from "../assets/google.png";

const LoginModal = () => {
  const { isLogOpen, setIsLogOpen } = useContext(ModalContext);
  const { login } = useAuth();
  return (
    <div>
      <Modal isOpen={isLogOpen} closeTimeoutMS={300}>
        <Button
          onClick={() => {
            setIsLogOpen(false);
          }}
          className="ml-auto"
        >
          close
        </Button>
        <div className="flex flex-col justify-center items-center">
          <div>
            <p className="text-xl text-slate-600 font-semibold mb-10">
              Welcome, login to get writing
            </p>
            <img src={login_png} alt="" className="rounded-full w-64 h-64" />
          </div>
          <div className="flex items-center flex-col mt-10">
            <Button
              onClick={() => {
                login();
              }}
            >
              <img src={google_png} alt="" className="w-10 h-10"/>
              Login with Google
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Alterrnative login methods coming soon
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
