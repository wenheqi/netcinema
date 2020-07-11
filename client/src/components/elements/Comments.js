import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import "./Comments.css";

export default function Comments({ movieId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const loadComments = () => {
    setIsLoading(true);
    axios
      .get(`/api/v1/comments/${movieId}/${comments.length}`)
      .then((res) => res.data)
      .then((data) => {
        setComments((oldComments) => [...oldComments, ...data.commentsList]);
        setIsLoading(false);
        if (data.commentsList.length < 20) {
          setHasMoreComments(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addComment = () => {
    console.log("im in add comment function");
    if (localStorage.getItem("nc-token") !== null) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("nc-token")}`;
    }
    axios
      .post("/api/v1/comments", {
        movieId: movieId,
        text: newComment,
        date: new Date(),
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.status === "error") {
          return;
        }
        setComments((oldComments) => [data.newComment, ...oldComments]);
      });
  };

  useEffect(() => {
    loadComments();
  }, []); // eslint-disable-next-line

  const onCommentInput = (e) => {
    setNewComment(e.currentTarget.textContent);
  };

  return (
    <div className="commentsContainer">
      <h1>Comments</h1>
      {localStorage.getItem("nc-token") ? (
        <div className="commentsEditorContainer">
          <div
            contentEditable={true}
            placeholder="Add a public comment..."
            className="commentsInputContainer"
            onInput={onCommentInput}
          ></div>
          <div className="commentsInputOptionsContainer">
            <button className="cancel">CANCEL</button>
            <button
              disabled={newComment.length > 0 ? false : true}
              onClick={addComment}
            >
              COMMENT
            </button>
          </div>
        </div>
      ) : (
        <div>Signin to comment</div>
      )}
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      {isLoading && <div>Loading...</div>}
      {hasMoreComments && (
        <div className="commentsLoadMoreContainer">
          <button onClick={loadComments}>LOAD MORE</button>
        </div>
      )}
    </div>
  );
}
