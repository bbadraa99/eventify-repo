'use client';

import Link from 'next/link';
import Header from '../components/Header';
import React, { useState } from 'react';
import styles from './checklist.module.css';
import { TaskElement } from '../eventTemplate';

interface PropElements{
  updateEventData: (newTaskData: TaskElement[]) => void;
  template_tasks: TaskElement[];
}

const Checklist = (props: PropElements) => {
  const [tasks, setTasks] = useState(props.template_tasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskLabel, setNewTaskLabel] = useState(''); // New state for task label
  const [addingTask, setAddingTask] = useState(false);

  const handleAddTaskClick = () => {
    setAddingTask(true);
  };

  const handleCreateTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText.trim(),
        label: newTaskLabel.trim(), // Include the task label
        showMenu: false,
      };
      setTasks([newTask, ...tasks]);
      setNewTaskText('');
      setNewTaskLabel(''); // Reset the label input
      setAddingTask(false);
    }
  };

  const handleCancelTask = () => {
    setNewTaskText('');
    setNewTaskLabel(''); // Reset the label input
    setAddingTask(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateTask();
    }
  };

  const toggleMenu = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, showMenu: !task.showMenu } : task));
  };

  const handleEditTask = (id: number) => {
    // Logic to edit task
    console.log('Edit task', id);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.minorContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Start with the template checklist</h1>
          <button className={styles.addButton} onClick={handleAddTaskClick}>+ Add a task</button>
        </div>
        {addingTask && (
          <div className={styles.newTaskContainer}>
            <textarea
              className={styles.textarea}
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter new task"
              autoFocus
            />
            <input
              className={styles.input}
              value={newTaskLabel}
              onChange={(e) => setNewTaskLabel(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter task label"
            />
            <div className={styles.buttonContainer}>
              <button className={styles.cancelButton} onClick={handleCancelTask}>Cancel</button>
              <button className={styles.saveButton} onClick={handleCreateTask}>Add task</button>
            </div>
          </div>
        )}
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id} className={styles.taskItem}>
              <label className={styles.taskLabelContainer}>
                <span className={styles.taskText}>{task.text}</span>
                <span className={styles.taskLabel}>{task.label}</span>
              </label>
              <button className={styles.moreButton} onClick={() => toggleMenu(task.id)}>...</button>
              {task.showMenu && (
                <div className={styles.menu}>
                  <button className={styles.menuItem} onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button className={styles.menuItem} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button onClick = {() => props.updateEventData(tasks)}>Create</button>
        
      </div>
    </div>
  );
};

export default Checklist;
