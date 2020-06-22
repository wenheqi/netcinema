import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../elements/Navbar";
import "./Movie.css";

export default function Movie() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/v1/movies/id/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // set page title
        document.title = data.name;
        setMovie(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setMovie(null);
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div>I'm loading</div>
      ) : (
        <div>
          {movie == null ? (
            <div>no data for this movie</div>
          ) : (
            <div>
              <NavBar />
              <div className="heroContainer">
                <div className="heroImageContainer">
                  <div className="heroImage">
                    <img
                      src={
                        movie.thumbnailUrl ? movie.thumbnailUrl : movie.image
                      }
                      alt={movie.name}
                    />
                  </div>
                </div>
                <div className="heroMetadataContainer">
                  <h1 className="titleInfoTitle">{movie.name}</h1>
                  <div className="titleInfoMetadataContainer">
                    <span>
                      <a>
                        {movie.year
                          ? movie.year
                          : movie.datePublished.substring(0, 4)}
                      </a>
                    </span>
                    <span>
                      <a>
                        {movie.contentRating
                          ? movie.contentRating
                          : "Not Rated"}
                      </a>
                    </span>
                    <span>
                      <a>{movie.duration.substring(2).toLowerCase()}</a>
                    </span>
                    <span>
                      <a>{movie.genre[0]}</a>
                    </span>
                  </div>
                  <div className="titleInfoPlot">
                    <div>{movie.description}</div>
                  </div>
                </div>
              </div>

              <div className="moreDetails">
                <span>{movie.aggregateRating.ratingValue} / 10</span>
                <div>
                  <div>Keywords</div>
                  {movie.keywords.map((keyword) => {
                    return <span key={keyword}>{keyword}</span>;
                  })}
                </div>
                <div>
                  <div>Director</div>
                  {movie.director.map((director) => {
                    return <span key={director.nmid}>{director.name}</span>;
                  })}
                </div>
                <div>
                  <div>Cast</div>
                  {movie.actor.map((actor) => {
                    return <span key={actor.nmid}>{actor.name}</span>;
                  })}
                </div>
                <div>
                  <div>Genre</div>
                  {movie.genre.map((genre) => {
                    return <span key={genre}>{genre}</span>;
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
