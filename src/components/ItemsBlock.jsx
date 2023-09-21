import React from "react";
import { Item } from "./Item";

export const ItemsBlock = ({
  itemsList,
  newItem,
  handleItemChange,
  handleItemAdded,
  handleItemSelected,
  handleItemDeleted,
}) => (
  <div className="page__main__block items">
    <h1 className="page__main__block__title">Items</h1>
    <form
      className="items-block__form"
      onSubmit={handleItemAdded}
    >
      <input
        type="text"
        className="items-block__form__input"
        placeholder="Type name here..."
        required
        value={newItem}
        onChange={handleItemChange}
      />
      <button type="submit" className="items-block__form__button">
        Add New
      </button>
    </form>
    <ul className="items-block__list">
      {itemsList.map(item => (
        <Item
          key={item.id}
          item={item}
          handleItemSelected={handleItemSelected}
          handleItemDeleted={handleItemDeleted}
        />
      ))}
    </ul>
  </div>
);
