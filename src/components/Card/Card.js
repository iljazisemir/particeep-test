import React, { useState } from "react";
import "./Card.css";
import { useDispatch } from "react-redux";
import {
  likeMovie,
  unlikeMovie,
  dislikeMovie,
  undislikeMovie,
  deleteMovie,
} from "../../redux";

// SVG
import HandUp from "../../SVG/HandUp";
import HandDown from "../../SVG/HandDown";

export default function Card({ movie }) {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const dispatch = useDispatch();

  const handleLike = (movie) => {
    if (like !== true) dispatch(likeMovie(movie.id));
    if (dislike === true) dispatch(undislikeMovie(movie.id));
    setLike(true);
  };

  const handleUnLike = (movie) => {
    if (like === true) dispatch(unlikeMovie(movie.id));
    setLike(false);
  };

  const handleDislike = (movie) => {
    if (dislike !== true) dispatch(dislikeMovie(movie.id));
    if (like === true) dispatch(unlikeMovie(movie.id));
    setDislike(true);
  };

  const handleUnDislike = (movie) => {
    if (dislike === true) dispatch(undislikeMovie(movie.id));
    setDislike(false);
  };

  const percentageOfLike =
    (movie.likes / (movie.dislikes + movie.likes)) * 100 + "%";

  return (
    <div className="card">
      <button
        onClick={() => dispatch(deleteMovie(movie.id))}
        className="delete-button"
      >
        X
      </button>
      <h3 className="title-movie">{movie.title}</h3>
      <span className="category">{movie.category}</span>
      <div className="toggle-container">
        <div className="svg-ratio-container">
          <div className="container-svg">
            <div className="svg-span-container">
              {!like ? (
                <HandUp
                  onClick={() => handleLike(movie)}
                  className="hand-svg"
                />
              ) : (
                <HandUp
                  onClick={() => handleUnLike(movie)}
                  className="hand-svg"
                />
              )}
              <span>{movie.likes}</span>
            </div>
            <div className="svg-span-container">
              {!dislike ? (
                <HandDown
                  onClick={() => handleDislike(movie)}
                  className="hand-svg"
                />
              ) : (
                <HandDown
                  onClick={() => handleUnDislike(movie)}
                  className="hand-svg"
                />
              )}
              <span>{movie.dislikes}</span>
            </div>
          </div>
          <div className="ratio-container">
            <div
              className="like-ratio"
              style={{ width: percentageOfLike }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
