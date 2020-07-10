import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JumboSearch.css";

export default function JumboSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [suggestionData, setSuggestionData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (query.length === 0 || /^\s+$/.test(query)) {
        return;
      }
      axios
        .get(`/api/v1/movies/suggest/${query.trim()}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setIsLoading(false);
          setSuggestionData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 200);
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <div className="jumboSearchContainer">
      <div className="greetingMsg">
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
              <div className="seachAutoCompleteLoader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="searchAutoCompleteContent">
              {suggestionData.length > 0 ? (
                suggestionData.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <a
                        style={{ color: "inherit", textDecoration: "none" }}
                        href={`/movie/${movie._id}`}
                      >
                        {movie.name}
                      </a>
                    </div>
                  );
                })
              ) : (
                <div>No result found...</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
