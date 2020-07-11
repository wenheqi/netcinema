import React from "react";
import "./Comment.css";

export default function Comment({ comment }) {
  const timeFromNow = (oldDate) => {
    const TIME_ONE_MIN = 60;
    const TIME_ONE_HOUR = 3600;
    const TIME_ONE_DAY = 86400;
    const seconds = Math.round(
      (new Date().getTime() - new Date(oldDate).getTime()) / 1000
    );
    if (seconds < TIME_ONE_MIN) {
      return "Just Now";
    } else if (seconds < TIME_ONE_HOUR) {
      return `${Math.round(seconds / TIME_ONE_MIN)} min ago`;
    } else if (seconds < TIME_ONE_DAY) {
      return `${Math.round(seconds / TIME_ONE_HOUR)} hour ago`;
    } else {
      return `${Math.round(seconds / TIME_ONE_DAY)} day ago`;
    }
  };
  return (
    <div className="commentContainer">
      <div className="commentTitleContainer">
        <span>{comment.name}</span>
        <span>{timeFromNow(comment.date)}</span>
      </div>
      <div className="commentContentContainer">
        <div className="commentContent">{comment.text}</div>
      </div>
    </div>
  );
}
