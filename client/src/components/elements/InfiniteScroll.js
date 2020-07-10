import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import "./InfiniteScroll.css";

export default function InfiniteScroll({ genre, initial }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [movies, setMovies] = useState([]);

  function loadMovies(offset) {
    const firstLetter = initial === "#" ? "_" : initial;
    setIsLoading(true);
    axios
      .get(`/api/v1/movies/genre/${genre}/${firstLetter}/${offset}`)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((data) => {
        setIsLoading(false);
        if (data.moviesList.length === 0) {
          setHasMoreMovies(false);
          return;
        }
        setMovies((oldMovies) => [...oldMovies, ...data.moviesList]);
      })
      .catch((e) => {
        // just terminate infinite scroll when error occurs
        setIsLoading(false);
        setHasMoreMovies(false);
      });
  }

  useEffect(() => {
    // scroll back to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setMovies([]);
    setIsLoading(false);
    setHasMoreMovies(true);
    loadMovies(0);
  }, [initial]); // eslint-disable-line react-hooks/exhaustive-deps

  window.onscroll = () => {
    if (isLoading || !hasMoreMovies) {
      return;
    }

    // Checks that the page has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMovies(movies.length);
    }
  };

  return (
    <div className="infiniteScrollContainer">
      <div className="itemsContainer">
        {movies.map((movie) => (
          // <div key={movie._id}>{movie.name}</div>
          <MovieCard key={movie._id} data={movie} />
        ))}
      </div>
      {isLoading && <Loader />}
      {movies.length === 0 && !hasMoreMovies && (
        <div>No movies under this category.</div>
      )}
      {movies.length > 0 && !hasMoreMovies && (
        <div>No more movies to load.</div>
      )}
    </div>
  );
}
