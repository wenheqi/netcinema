import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../elements/Navbar";
import Footer from "../elements/Footer";
import Loader from "../elements/Loader";
import Comments from "../elements/Comments";
import SimilarMovies from "../elements/SimilarMovies";
import NotFound from "./NotFound";
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
        setIsLoading(false);
        setMovie(null);
      });
  }, [id]);

  return movie === null || movie.status === "error" ? (
    <NotFound />
  ) : (
    <div>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="movieContainer">
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
                    <div className="heroSynopsisItem">{movie.description}</div>
                  ) : null}

                  {movie.director ? (
                    <div className="heroSynopsisItem">
                      <span className="heroSynopsisItemLabel">Director: </span>
                      {movie.director.map((director) => {
                        return <span key={director.nmid}>{director.name}</span>;
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
          <div className="commentsAndSimilarMoviesContainer">
            <Comments movieId={movie._id} />
            <SimilarMovies genre={movie.genre ? movie.genre[0] : null} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
