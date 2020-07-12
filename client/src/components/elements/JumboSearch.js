import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JumboSearch.css";

export default function JumboSearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [suggestionData, setSuggestionData] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);

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
    setSelectedIdx(-1);
  };

  const handleKeyDown = (event) => {
    const KEY_ENTER = 13;
    const KEY_ARROW_UP = 38;
    const KEY_ARROW_DOWN = 40;
    const KEY_ARROW_ESC = 27;
    switch (event.keyCode) {
      case KEY_ENTER:
        if (query.length === 0) {
          event.preventDefault();
        }
        break;
      case KEY_ARROW_DOWN:
        if (selectedIdx + 1 < suggestionData.length)
          setSelectedIdx((oldId) => oldId + 1);
        else if (suggestionData.length > 0) {
          setSelectedIdx(0);
        } else {
          setSelectedIdx(-1);
        }
        break;
      case KEY_ARROW_UP:
        if (selectedIdx > 0) {
          setSelectedIdx((oldId) => oldId - 1);
        } else if (suggestionData.length > 0) {
          setSelectedIdx(suggestionData.length - 1);
        } else {
          setSelectedIdx(-1);
        }
        break;
      case KEY_ARROW_ESC:
        setQuery("");
        break;
      default:
        break;
    }
  };

  const onSearchButtonClick = (event) => {
    event.preventDefault();
    if (selectedIdx >= 0) {
      window.location = `/movie/${suggestionData[selectedIdx]._id}`;
      return;
    }
    window.location = `/search/${query}`;
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
            onKeyDown={handleKeyDown}
            placeholder="Search for a movie, tv show, person......"
          />
          <input type="submit" value="Search" onClick={onSearchButtonClick} />
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
            <ul className="searchAutoCompleteContent">
              {suggestionData.length > 0 ? (
                suggestionData.map((movie, index) => {
                  return (
                    <li
                      key={movie._id}
                      className={index === selectedIdx ? "selected" : ""}
                    >
                      <a
                        style={{ color: "inherit", textDecoration: "none" }}
                        href={`/movie/${movie._id}`}
                      >
                        {movie.name}
                      </a>
                    </li>
                  );
                })
              ) : (
                <li>No result found...</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
