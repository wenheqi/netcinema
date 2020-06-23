import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../elements/Navbar";
import Footer from "../elements/Footer";
import Loader from "../elements/Loader";
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
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {movie == null ? (
            <div>no data for this movie</div>
          ) : (
            <div className="heroContainer">
              <div className="heroImageContainer">
                <div className="heroImage">
                  <img
                    src={movie.thumbnailUrl ? movie.thumbnailUrl : movie.image}
                    alt={movie.name}
                  />
                </div>
                <div className="heroImageOverlay"></div>
              </div>
              <div className="heroDetailsContainer">
                <div className="heroDetails">
                  <h1 className="heroDetailsTitle">{movie.name}</h1>
                  <div className="heroMetadataContainer">
                    {movie.year ? (
                      <span className="heroMetadataItem itemYear">
                        {movie.year}
                      </span>
                    ) : movie.datePublished ? (
                      <span>{movie.datePublished.substring(0, 4)}</span>
                    ) : null}

                    {movie.contentRating ? (
                      <span className="heroMetadataItem">
                        <span className="contentRating">
                          <span className="contentRatingNumber">
                            {movie.contentRating}
                          </span>
                        </span>
                      </span>
                    ) : null}

                    {movie.duration ? (
                      <span className="heroMetadataItem">
                        {movie.duration
                          .substring(2)
                          .toLowerCase()
                          .replace("h", "h ")}
                      </span>
                    ) : null}

                    {movie.aggregateRating ? (
                      <span className="heroMetadataItem">
                        {movie.aggregateRating.ratingValue}
                      </span>
                    ) : null}
                  </div>
                  <div className="heroSynopsisContainer">
                    {movie.description ? (
                      <div className="heroSynopsisItem">
                        {movie.description}
                      </div>
                    ) : null}

                    {movie.director ? (
                      <div className="heroSynopsisItem">
                        <span className="heroSynopsisItemLabel">
                          Director:{" "}
                        </span>
                        {movie.director.map((director) => {
                          return (
                            <span key={director.nmid}>{director.name}</span>
                          );
                        })}
                      </div>
                    ) : null}

                    {movie.actor ? (
                      <div className="heroSynopsisItem">
                        <span className="heroSynopsisItemLabel">Starring:</span>
                        {movie.actor.map((actor) => {
                          return <span key={actor.nmid}>{actor.name}</span>;
                        })}
                      </div>
                    ) : null}

                    {movie.genre ? (
                      <div className="heroSynopsisItem">
                        <span className="heroSynopsisItemLabel">Genre: </span>
                        {movie.genre.map((genre) => {
                          return <span key={genre}>{genre}</span>;
                        })}
                      </div>
                    ) : null}

                    {movie.keywords ? (
                      <div className="heroSynopsisItem">
                        <span className="heroSynopsisItemLabel">Keyword: </span>
                        {movie.keywords.map((keyword) => {
                          return <span key={keyword}>{keyword}</span>;
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div>TODO: I'm another container</div>
      <div>TODO: I'm yet another container</div>
      <Footer />
    </div>
  );
}
