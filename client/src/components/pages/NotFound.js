import React from "react";
import Navbar from "../elements/Navbar";
import deadpool from "../../assets/deadpool-06f2a06d7a418ec887300397b6861383bf1e3b72f604ddd5f75bce170e81dce9.png";
import "./NotFound.css";
import UIButton from "../elements/UIButton";

export default function NotFound() {
  return (
    <div className="notFoundContainer">
      <Navbar />
      <div className="notFoundHeroContainer">
        <div className="notFoundHeroTitleContainer">
          <h1>Hi there,</h1>
          <img src={deadpool} alt="deadpool" />
        </div>
        <div className="notFoundHeroContentContainer">
          <h1>Lost your way?</h1>
          <p>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <div>
            <a href="/">
              <UIButton text="NETCINEMA HOME" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
