import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../elements/Navbar";
import Footer from "../elements/Footer";
import Loader from "../elements/Loader";
import MovieCard from "../elements/MovieCard";
import "./Search.css";

export default function Search() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/v1/movies/name/${query}`)
      .then((res) => res.data)
      .then((data) => {
        setResults(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="searchResultsContainer">
          <div className="searchBreadcrumb">
            <a href="/">Home</a> {`> Search`}
          </div>
          <h3>
            {results.length} results for {`"${query}"`}
          </h3>
          <div className="searchResults">
            {results.map((movie) => (
              <MovieCard key={movie._id} data={movie} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
