import React from "react";
import doc from "../assets/doc.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const DocCard = ({ name, _id }) => {
  const handleClick = () => {
    
  }
  return (
    <div
      className="border border-[#dfe1e5] cursor-pointer w-[208px] rounded hover:border-[#1A73E8] text-sm"
      onClick={handleClick}
    >
      <div className="h-[180px] overflow-hidden">
        <img src={doc} alt="doc" />
      </div>
      <div className="pt-4 pl-4 pb-[14px] pr-2 border-t border-[#dfe1e5]">
        <p className="text-[#414549] font-medium ml-[2px] leading-[18px] tracking-wide">
          {name}
        </p>
        <div className="flex items-center">
          <img src={logo} alt="logo doc" className="w-5 mt-[2px] mr-2" />
          <p className="text-[12px] text-[#80868B] ">Opened</p>
        </div>
      </div>
    </div>
  );
};

export default DocCard;
