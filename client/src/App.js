import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import TextEditor from "./components/TextEditor";
import RecentsModal from "./components/RecentsModal";
import LoginModal from "./components/LoginModal";
import { Toaster } from "react-hot-toast";
import MobileUnav from "./components/MobileUnav";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the width is less than 768px (common breakpoint for mobile)
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return <MobileUnav /> ;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route path="documents/:id" element={<TextEditor />} />
      </Routes>
      <Toaster />
      <LoginModal />
      <RecentsModal />
    </BrowserRouter>
  );
};

export default App;
