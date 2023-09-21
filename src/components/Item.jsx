import React from "react";
import classNames from 'classnames';

export const Item = ({
  item,
  handleItemSelected,
  handleItemDeleted
}) => {
  const { id, title, isSelected, comments } = item;

  return (
    <li
      key={id}
      className={classNames(
        "items-block__list__item item",
        { "item--active": isSelected }
      )}
      onClick={(event) => {
        if (event.target.nodeName !== "BUTTON") {
          handleItemSelected(id);
        }
      }}
    >
      {title}
      <span className="item__amount">{comments.length}</span>
      <button
        className="item__button"
        type="button"
        onClick={() => handleItemDeleted(id)}
      >
        Delete
      </button>
    </li>
  );
};
