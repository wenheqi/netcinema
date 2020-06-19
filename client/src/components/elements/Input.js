import React from "react";
import "./Input.css";

export default function Input({
  type,
  label,
  autoComplete,
  value,
  handleChange,
  handleBlur,
  errMsg,
  isValidInput,
}) {
  return (
    <div className="inputContainer">
      <div className="inputFieldContainer">
        <input
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            (value.length > 0 ? " hasText" : "") +
            (isValidInput ? " " : " isInvalid")
          }
          novalidate="true"
        />
        <label>{label}</label>
      </div>
      <div className="inputErrorContainer">
        <span className={isValidInput ? "" : "isInvalid"}>{errMsg}</span>
      </div>
    </div>
  );
}
