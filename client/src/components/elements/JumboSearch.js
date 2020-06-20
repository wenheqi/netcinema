import React, { useState } from "react";
import "./JumboSearch.css";

export default function JumboSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    // query auto-complete suggestion from db
    // set loading/display status accordingly
  };
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
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for a movie, tv show, person......"
          />
          <input type="submit" value="Search" />
        </form>
        <div
          className={
            "searchAutoCompleteContainer" +
            (query.length > 0 ? " hasQuery" : " ")
          }
        >
          {isLoading ? (
            <div className="searchAutoCompleteLoading">
              <div class="seachAutoCompleteLoader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="searchAutoCompleteContent">
              <div>{query}</div>
              <div>{query}</div>
              <div>{query}</div>
              <div>{query}</div>
              <div>{query}</div>
              <div>{query}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
