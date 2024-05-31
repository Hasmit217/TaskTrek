// components/Column.js
import React from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from './Card';

const Column = ({ data, keyProp, moveCard }) => {
  return (
    <div key={keyProp} className={"column"}>
      <h2 style={{"padding":"15px", "fontFamily":"Trebuchet MS"}}>{data.title}</h2>
      <Droppable droppableId={keyProp}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={"droppable-col"}
            >
              {data.items.map((el, index) => {
                return (
                  <Draggable key={el.id} index={index} draggableId={el.id}>
                    {(provided, snapshot) => {
                      return (
                        <Card
                          provided={provided}
                          snapshot={snapshot}
                          item={el}
                          status={keyProp}
                          moveCard={moveCard}
                        />
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Column;
