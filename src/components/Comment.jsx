export const Comment = ({ comment }) => {
  const { color, text } = comment;

  return (
    <li className="comments-block__list__comment">
      <div className="comment">
        <div
          className="comment__color"
          style={{backgroundColor: color}}
        />
        <div className="comment__text">{text}</div>
      </div>
    </li>
  );
};
