import React from "react";
import "./JumboSearch.css";

export default function JumboSearch() {
  return (
    <div className="jumboSearchContainer">
      <div>
        <h2>Welcome.</h2>
        <h3>
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
      </div>
      <div className="search">
        <form method="get">
          <input
            type="text"
            placeholder="Search for a movie, tv show, person......"
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
}
