import React from "react";
import "./Navbar.css";

export default function Navbar({ onlyDisplayBrand = false }) {
  return (
    <nav className="topnav">
      <div className="topnav-left">
        <a href="/">NETCINEMA</a>
      </div>
      {onlyDisplayBrand ? (
        <div className="topnav-right"></div>
      ) : (
        <div className="topnav-right">
          <div>SEARCH(IP5 SE cannot fit in one line)</div>
          <div>
            <a href="/login">Sign In</a>
          </div>
        </div>
      )}
    </nav>
  );
}
