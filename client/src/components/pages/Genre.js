import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../elements/Navbar";
import Footer from "../elements/Footer";
import InfiniteScroll from "../elements/InfiniteScroll";
import "./Genre.css";

export default function Genre() {
  const { id } = useParams();
  const genre = id.charAt(0).toUpperCase() + id.slice(1);
  document.title = `NetCinema - ${genre} movies`;

  const navCategory = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "#",
  ];

  const [tabVal, setTabVal] = useState("A");

  const onTabChange = (e) => {
    setTabVal(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <div className="genreContainer">
        <div className="genreBreadcrumb">
          <a href="/">Home</a> {`>`} {genre}
        </div>
        <div className="genreSliderContainer">
          <div className="genreSliderNavbarContainer">
            <div className="genreSlideNavbar">
              {navCategory.map((cat) => (
                <label className="genreSlideNavbarItem" key={cat}>
                  <input
                    type="radio"
                    name="genreNavRadio"
                    value={cat}
                    onChange={onTabChange}
                    checked={tabVal === cat}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="genreSliderItemsContainer">
            <InfiniteScroll genre={genre} initial={tabVal} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
