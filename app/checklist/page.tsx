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
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const [addingTask, setAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [editedTaskLabel, setEditedTaskLabel] = useState('');

  const handleAddTaskClick = () => {
    setAddingTask(true);
  };

  const handleCreateTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: tasks.length + 1,
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editingTaskId !== null) {
        handleUpdateTask();
      } else {
        handleCreateTask();
      }
    }
  };

  const handleEditTask = (id: number, text: string, label: string) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
    setEditedTaskLabel(label);
  };

  const handleUpdateTask = () => {
    if (editedTaskText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingTaskId
          ? { ...task, text: editedTaskText.trim(), label: editedTaskLabel.trim() }
          : task
      ));
      setEditingTaskId(null);
      setEditedTaskText('');
      setEditedTaskLabel('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
    setEditedTaskLabel('');
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
              {editingTaskId === task.id ? (
                <div className={styles.editTaskContainer}>
                  <textarea
                    className={styles.textarea}
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <input
                    className={styles.input}
                    value={editedTaskLabel}
                    onChange={(e) => setEditedTaskLabel(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={handleCancelEdit}>Cancel</button>
                    <button className={styles.saveButton} onClick={handleUpdateTask}>Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <label className={styles.taskLabelContainer}>
                    <span className={styles.taskText}>{task.text}</span>
                    <span className={styles.taskLabel}>{task.label}</span>
                  </label>
                  <div className={styles.taskActions}>
                    <button className={styles.actionButton} onClick={() => handleEditTask(task.id, task.text, task.label)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                      </svg>
                    </button>
                    <button className={styles.actionButton} onClick={() => handleDeleteTask(task.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                    </button>
                  </div>
                </>
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
