'use client';

import Link from 'next/link';
import Header from '../components/Header';
import React, { useState } from 'react';
import styles from './checklist.module.css';
import { TaskElement } from '../eventTemplate';

interface PropElements {
  updateEventData: (newTaskData: TaskElement[]) => void;
  template_tasks: TaskElement[];
}

const Checklist = (props: PropElements) => {
  const [tasks, setTasks] = useState(props.template_tasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const [addingTask, setAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskLabel, setEditTaskLabel] = useState('');
  
  const handleAddTaskClick = () => {
    setAddingTask(true);
  };

  const handleCreateTask = () => {
    if (newTaskText.trim()) {
      const newRandomId = Math.floor(Math.random() * 100000);
      const newTask = {
        id: newRandomId,
        text: newTaskText.trim(),
        label: newTaskLabel.trim(),
        showMenu: false,
      };
      setTasks([newTask, ...tasks]);
      setNewTaskText('');
      setNewTaskLabel('');
      setAddingTask(false);
    }
  };

  const handleCancelTask = () => {
    setNewTaskText('');
    setNewTaskLabel('');
    setAddingTask(false);
  };

  const handleEditTaskClick = (task: TaskElement) => {
    setEditingTaskId(task.id);
    setEditTaskText(task.text);
    setEditTaskLabel(task.label);
  };

  const handleSaveEditTask = () => {
    setTasks(tasks.map(task => 
      task.id === editingTaskId ? { ...task, text: editTaskText.trim(), label: editTaskLabel.trim() } : task
    ));
    setEditingTaskId(null);
    setEditTaskText('');
    setEditTaskLabel('');
  };

  const handleCancelEditTask = () => {
    setEditingTaskId(null);
    setEditTaskText('');
    setEditTaskLabel('');
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
              placeholder="Enter new task"
              autoFocus
            />
            <input
              className={styles.input}
              value={newTaskLabel}
              onChange={(e) => setNewTaskLabel(e.target.value)}
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
              {editingTaskId === task.id ? (
                <div className={styles.editTaskContainer}>
                  <label id="task-text" htmlFor="task-text">Task description:</label>
                  <textarea
                    id="task-text"
                    className={styles.textarea}
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    placeholder="Edit task"
                    autoFocus
                  />
                  <label id="task-label" htmlFor="task-label">Task label:</label>
                  <input
                    id="task-label"
                    className={styles.input}
                    value={editTaskLabel}
                    onChange={(e) => setEditTaskLabel(e.target.value)}
                    placeholder="Edit label"
                  />
                  <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={handleCancelEditTask}>Cancel</button>
                    <button className={styles.saveButton} onClick={handleSaveEditTask}>Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <label className={styles.taskLabelContainer}>
                    <span className={styles.taskText}>{task.text}</span>
                    <span className={styles.taskLabel}>{task.label}</span>
                  </label>
                  <div className={styles.taskActions}>
                    <div className="dropdown dropdown-bottom">
                      <div tabIndex={0} role="button" className="btn m-1 bg-background-90 border-none shadow-none">...</div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36">
                        <li>
                          <a onClick={() => handleEditTaskClick(task)}>
                            Edit
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleDeleteTask(task.id)}>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => props.updateEventData(tasks)}>Create</button>
      </div>
    </div>
  );
};

export default Checklist;
