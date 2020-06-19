import React from "react";
import "./Form.css";

export default function Form({ title, method, handleSubmit, children }) {
  return (
    <div className="formContainer">
      <h1>{title}</h1>
      <form method={method} onSubmit={handleSubmit} nonvalidate="true">
        {children}
      </form>
    </div>
  );
}
