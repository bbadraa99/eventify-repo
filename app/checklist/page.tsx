'use client';

import Header from '../components/Header';
import React, { useState } from 'react';
import styles from './checklist.module.css';

const Checklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Make a guest list', completed: false },
    { id: 2, text: 'Send invitations', completed: false },
    { id: 3, text: 'Book entertainment venue', completed: false },
    { id: 4, text: 'Order food', completed: false },
    { id: 5, text: 'Prepare decorations', completed: false },
    { id: 6, text: 'Arrange tables', completed: false },
  ]);

  const handleCheckboxChange = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className={styles.container}>
    <Header />
    <div className={styles.minorContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Start with the template checklist</h1>
        <button className={styles.addButton}>+ Add a task</button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <label className={styles.taskLabel}>
              <input
                type="checkbox"
                checked={task.completed}
                className={styles.checkbox}
                onChange={() => handleCheckboxChange(task.id)}
              />
              {task.text}
            </label>
            <button className={styles.moreButton}>...</button>
          </li>
        ))}
      </ul>
      <button className={styles.proceedButton}>Create</button>
    </div>
    </div>
  );
};

export default Checklist;
