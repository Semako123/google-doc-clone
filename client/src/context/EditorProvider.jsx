import React, { createContext, useState } from "react";

export const EditorContext = createContext();

const EditorProvider = ({ children }) => {
  const [quill, setQuill] = useState();
  const [docName, setDocName] = useState("Untitled");
  const [socket, setSocket] = useState();
  return (
    <EditorContext.Provider
      value={{ quill, setQuill, docName, setDocName, socket, setSocket }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
