import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Modal from "react-modal";
import ModalProvider from "./context/ModalProvider";
import EditorProvider from "./context/EditorProvider";
import App from "./App";

Modal.setAppElement("#root");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <EditorProvider>
          <App />
      </EditorProvider>
    </ModalProvider>
  </React.StrictMode>
);
