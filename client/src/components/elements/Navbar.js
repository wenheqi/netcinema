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
          <div>
            {localStorage.getItem("nc-token") ? (
              <div>
                <div className="topnav-dropdown">
                  <img
                    src="https://lh3.googleusercontent.com/ogw/ADGmqu-oinWIzD2ajTwv6O9_HHHOdaZpxpqMJ7X4JOPa=s32-c-mo"
                    alt="user avatar"
                  />
                  <div className="topnav-dropdown-content">
                    <div className="topnav-dropdown-content-item">
                      <a href="/dashboard">My profile</a>
                    </div>
                    <div className="topnav-dropdown-content-item">
                      <a href="/logout">Sign out</a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a href="/login">Sign In</a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
