import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../context/EditorProvider";

const Cursor = ({ position, name, url }) => {
  const { quill } = useContext(EditorContext);
  const [coord, setCoord] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  useEffect(() => {
    if (!quill || !position) return;
    const coord = quill.getBounds(position);
    setCoord(coord);
  }, [quill, position]);

  return (
    <div
      className={`flex items-center flex-col w-fit opacity-50 absolute z-50 transition-all`}
      style={{
        top: coord.top + 110,
        left: coord.left,
      }}
    >
      <div className="h-4 w-4 rounded-full border-2 border-slate-600 flex items-center justify-center overflow-hidden">
        <img src={url} alt="" className="w-full" referrerPolicy="no-referrer" />
      </div>
      <div className="text-[8px] bg-indigo-300 text-white p-[1px] px-[3px] rounded mt-[1px]">
        {name}
      </div>
    </div>
  );
};

export default Cursor;
