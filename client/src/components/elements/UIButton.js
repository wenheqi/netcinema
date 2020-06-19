import React from "react";
import "./UIButton.css";

export default function UIButton({ type, handleClick, autoComplete, text }) {
  return (
    <button
      className="uiButton"
      type={type}
      onClick={handleClick}
      autoComplete={autoComplete}
    >
      {text}
    </button>
  );
}
