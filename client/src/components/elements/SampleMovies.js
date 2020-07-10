import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SampleMovies.css";

export default function SampleMovies({ genre }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/movies/sample/${genre}`)
      .then((res) => res.data)
      .then((data) => setMovies(data.moviesList))
      .catch((e) => console.log(e));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sampleMoviesContainer">
      <h3>
        <a href={`/genre/${genre}`}>{genre.toUpperCase()}</a>
      </h3>
      <div className="sampleMovies">
        {movies.map((movie) => (
          <a
            key={movie._id}
            href={`/movie/${movie._id}`}
            className="sampleMovieContainer"
          >
            <div className="sampleMoviePoster">
              <img
                src={movie.image.replace(".jpg", "UX273_CR0,0,273,402_AL_.jpg")}
                alt={movie.name}
              />
            </div>
            <div>{movie.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
