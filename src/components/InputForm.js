// InputForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const InputForm = ({ addItem }) => {
  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
    if (text.trim() === '') {
      alert('Please enter task name.');
      return;
    }

    addItem({
      id: uuidv4(),
      name: text,
      desc: desc,
    });

    setText('');
    setDesc('');
    closeModal();
  };

  return (
    <div className="input-form">
      <nav className="navbar">
        <div className="logo">TaskTrek</div>
        <button className="create-task-btn" onClick={openModal}>Create Task</button>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Create Task</h2>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Task name"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Task description"
            ></textarea>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;