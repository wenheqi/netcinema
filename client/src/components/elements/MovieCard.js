import React from "react";
import "./MovieCard.css";

export default function MovieCard({ data }) {
  const { _id, name, image } = data;
  // refine image size for better display
  const posterUrl = image.replace(".jpg", "UX273_CR0,0,273,402_AL_.jpg");
  return (
    <a href={`/movie/${_id}`} className="movieCardContainer">
      <div className="movieCardPosterContainer">
        <img src={posterUrl} alt={name} />
      </div>
      <div className="movieCardContentContainer">{name}</div>
    </a>
  );
}
