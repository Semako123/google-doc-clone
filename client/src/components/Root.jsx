import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const uid = uuidv4();
    navigate(`/documents/${uid}`);
  }, [navigate]);

  return <div>Loading...</div>;
}
