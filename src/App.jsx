import React, { useEffect, useState } from "react";
import { CommentsBlock } from './components/CommentsBlock';
import { ItemsBlock } from "./components/ItemsBlock";

let itemsList1 = [
  {
    id: 12565,
    title: 'test 1',
    isSelected: false,
    comments: [
      {
        color: '#822057',
        text: 'comment 11',
      },
    ]
  },
  {
    id: 29083,
    title: 'test 2',
    isSelected: true,
    comments: [
      {
        color: '#fff',
        text: 'comment 21',
      },
      {
        color: '#028',
        text: 'comment 22',
      }
    ]
  },
];

export const App = () => {
  const [itemsList, setItemsList] = useState(
    localStorage.getItem('itemsList')
      ? JSON.parse(localStorage.getItem('itemsList') || '')
      : itemsList1,
  );
  const [currentId, setCurrentId] = useState(
    itemsList.filter(item => item.isSelected)[0].id || 0,
  );
  const [currentComments, setCurrentComments] = useState(
    itemsList.filter(item => item.id === currentId)[0].comments || [],
  );

  const [newItem, setNewItem] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newColor, setNewColor] = useState('#000000');

  useEffect(() => {
    localStorage.setItem('itemsList', JSON.stringify(itemsList));
  }, [itemsList, currentComments]);

  const handleItemChange = (event) => {
    setNewItem(event.target.value)
  };

  const handleItemAdded = (event) => {
    event.preventDefault();

    if(newItem.trim().length > 0) {
      const newId = +(String((new Date()).getTime())).slice(7);
      const firstItemAdding = itemsList.length === 0;

      setItemsList(prevList => [
        ...prevList,
        {
          id: newId,
          title: newItem,
          isSelected: firstItemAdding,
          comments: [],
        }
      ]);

      if (firstItemAdding) {
        handleItemSelected(newId);
      }
    }

    setNewItem('');
  };

  const handleItemSelected = (itemId) => {
    setItemsList(prevList => prevList.map(item => {
      return {
        ...item,
        isSelected: item.id === itemId,
      }
    }));
    setCurrentId(itemId);
    
    const comments = itemsList.find(item => item.id === itemId)?.comments || [];

    setCurrentComments(comments);
  };

  const handleItemDeleted = (itemId) => {
    const newArray = itemsList.filter(item => item.id !== itemId);

    setItemsList(newArray);

    const lastItemId = newArray.length > 0
      ? newArray[newArray.length - 1].id
      : undefined;

    handleItemSelected(lastItemId);
  };

  const handleCommentAdded = (event) => {
    event.preventDefault();

    if(currentId && newComment.trim().length > 0) {
      const comment = {
        color: newColor,
        text: newComment,
      };

      setItemsList(prevList => prevList.map(
        item => item.id === currentId
          ? {
              ...item,
              comments: [
                ...item.comments,
                comment,
              ]
            }
          : item
      ));

      setCurrentComments(prevComments => [...prevComments, comment]);
      setNewComment('');
      setNewColor('#000000');
    }
  };

  const handleColorChange = (event) => {
    setNewColor(event.target.value)
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  };

  return (
    <div className="page">
      <aside className="aside-block">
        <h2 className="aside-block__title">DAYRY APP</h2>
        <p>Comment whit no sense</p>
      </aside>

      <main className="page__main">
        <div className="page__main__container">
          <ItemsBlock
            itemsList={itemsList}
            newItem={newItem}
            handleItemChange={handleItemChange}
            handleItemAdded={handleItemAdded}
            handleItemSelected={handleItemSelected}
            handleItemDeleted={handleItemDeleted}
          />

          <CommentsBlock
            currentId={currentId}
            currentComments={currentComments}
            handleCommentAdded={handleCommentAdded}
            newColor={newColor}
            handleColorChange={handleColorChange}
            newComment={newComment}
            handleCommentChange={handleCommentChange}
          />
        </div>
      </main>
    </div>
  );
};
