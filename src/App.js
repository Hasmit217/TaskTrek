// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import InputForm from './components/InputForm';
import Column from './components/Column';

const initialItemsData = [
  {
    id: v4(),
    name: "Python",
    desc: "Learn python from documentation"
  },
  {
    id: v4(),
    name: "Java",
    desc: "Learn Java from documentation"
  },
  {
    id: v4(),
    name: "OOPS",
    desc: "Targeting this Week"
  }
];

const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem('taskState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    "todo": {
      title: "Todo",
      items: initialItemsData
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  };
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem('taskState', JSON.stringify(state));
};

function App() {
  const [state, setState] = useState(loadStateFromLocalStorage());

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    // Add timestamp if moved to "done" state
    if (destination.droppableId === "done") {
      itemCopy.timestamp = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    setState(prev => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);

      return prev;
    });
  };

  const addItem = (newItem) => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            newItem,
            ...prev.todo.items
          ]
        }
      };
    });
  };

  const moveCard = (id, toColumn) => {
    if (!toColumn) return;

    setState(prev => {
      const newState = { ...prev };

      // Find and remove the item from the current column
      let itemToMove;
      for (let column in newState) {
        const index = newState[column].items.findIndex(item => item.id === id);
        if (index !== -1) {
          itemToMove = newState[column].items.splice(index, 1)[0];
          break;
        }
      }

      // Add timestamp if moved to "done" state
      if (toColumn === "done") {
        itemToMove.timestamp = new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      // Add the item to the new column
      newState[toColumn].items.unshift(itemToMove);

      return newState;
    });
  };

  return (
    <div className="App">
      <InputForm addItem={addItem} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
          {_.map(state, (data, key) => (
            <Column key={key} keyProp={key} data={data} moveCard={moveCard} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
