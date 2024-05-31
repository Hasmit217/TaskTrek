// components/Card.js
import React from 'react';

const Card = ({ provided, snapshot, item, status, moveCard }) => {
  const handleButtonClick = () => {
    const nextStatus = status === 'todo' ? 'in-progress' : status === 'in-progress' ? 'done' : '';
    if (nextStatus) {
      moveCard(item.id, nextStatus);
    }
  };

  return (
    <div
      className={`item ${snapshot.isDragging ? "dragging" : ""}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <h3 style={{ margin: "5px" }}>{item.name}</h3>
      <div className='card-content'>
        <span>{item.desc}</span>
        {status === 'done' && <p style={{margin:"5px"}}>Completed at: {item.timestamp}</p>}
      </div>
      {status !== 'done' && (
        <button onClick={handleButtonClick}>
          {status === 'todo' ? 'Start' : status === 'in-progress' ? 'Complete' : ''}
        </button>
      )}
    </div>
  );
};

export default Card;
