import React from "react";
import "./MovieCard.css";

export default function MovieCard({ data }) {
  const { _id, name, image } = data;
  return (
    <a href={`/movie/${_id}`} className="movieCardContainer">
      <div className="movieCardPosterContainer">
        <img
          src={image.replace(".jpg", "UX273_CR0,0,273,402_AL_.jpg")}
          alt={name}
        />
      </div>
      <div className="movieCardContentContainer">{name}</div>
    </a>
  );
}
