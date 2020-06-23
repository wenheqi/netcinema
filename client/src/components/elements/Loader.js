import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loaderContainer">
      <div className="loaderIconContainer">
        <div className="loaderIcon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
