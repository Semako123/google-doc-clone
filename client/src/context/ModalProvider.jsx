import React, { createContext } from "react";
import { useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isRecentOpen, setIsRecentOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ isLogOpen, setIsLogOpen, isRecentOpen, setIsRecentOpen}}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
