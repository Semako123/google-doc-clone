import React from "react";
import coming_soon from "../assets/coming_soon.jpg";

const MobileUnav = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700 p-6 text-center bg-blue-100">
      <img src={coming_soon} alt="Coming soon" className="w-64 h-64 rounded-full mb-10"/>
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Mobile Version Coming Soon!
      </h1>
      <p className="text-lg text-gray-500">
        We're working hard to optimize this site for mobile devices. Check back
        soon!
      </p>
    </div>
  );
};

export default MobileUnav;
