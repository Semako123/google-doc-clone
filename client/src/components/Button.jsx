import React from "react";

const Button = ({ children, variant, onClick, className }) => {

  return (
    <div
      className={`w-fit flex gap-x-2 items-center hover:cursor-pointer text-sm border-transparent border font-normal text-[#202124] hover:bg-[#E8EBEE] rounded px-2 py-[2px] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
