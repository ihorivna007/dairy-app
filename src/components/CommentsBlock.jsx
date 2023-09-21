import React from "react";
import { Comment } from './Comment';

export const CommentsBlock = ({
  currentId,
  currentComments,
  handleCommentAdded,
  newColor,
  handleColorChange,
  newComment,
  handleCommentChange
}) => {

  return (
    <div className="page__main__block comments">
      <h1 className="page__main__block__title">
        Comments # {currentId ? currentId : ''}
      </h1>
      {currentComments && (
        <ul className="comments-block__list">
          {currentComments.map(comment => (
            <Comment
              comment={comment}
              key={comment.color + comment.text}
            />
          ))}
        </ul>
      )}
      <form
        className="comments-block__form"
        onSubmit={handleCommentAdded}
      >
        <input
          type="color"
          className="comments-block__form__color"
          placeholder="Type name here..."
          value={newColor}
          onChange={handleColorChange}
        />
        <textarea
          className="comments-block__form__textarea"
          placeholder="Type comment here..."
          required
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit" className="comments-block__form__button">
          Add New
        </button>
      </form>
    </div>
  );
};
