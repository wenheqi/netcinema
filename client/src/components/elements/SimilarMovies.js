import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SimilarMovies.css";

export default function SimilarMovies({ genre }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (genre === null) {
      return;
    }
    axios
      .get(`/api/v1/movies/sample/${genre}`)
      .then((res) => res.data)
      .then((data) => setMovies(data.moviesList))
      .catch((e) => console.log(e));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="similarMoviesContainer">
      <h1>More Like This</h1>
      {genre === null ? (
        <div>No movies available</div>
      ) : (
        movies.map((movie) => (
          <a
            className="similarMovieContainer"
            href={`/movie/${movie._id}`}
            key={movie._id}
          >
            <div className="similarMoviePosterContainer">
              <img
                src={movie.image.replace(".jpg", "UX273_CR0,0,273,402_AL_.jpg")}
                alt={movie.name}
              />
            </div>
            <div className="simlarMovieContentContainer">{movie.name}</div>
          </a>
        ))
      )}
    </div>
  );
}
