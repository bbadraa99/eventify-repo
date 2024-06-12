'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import styles from './pref.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { usePathname } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GuestData } from '@/app/invite/page';
import Link from 'next/link';

const Pref: React.FC = () => {
  //get user
  const [user] = useAuthState(auth);
  const userEmail = user?.email;

  const path = usePathname();
  const eventId = path.split("/")[2];

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Planning', order: 0 },
    { id: 2, name: 'Booking', order: 0 },
    { id: 3, name: 'Communication', order: 0 },
    { id: 4, name: 'Catering', order: 0 },
    { id: 5, name: 'Setup', order: 0 },
    { id: 6, name: 'Decor', order: 0 },
  ]);

  const [currentOrder, setCurrentOrder] = useState(1);
  const [allSelected, setAllSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setAllSelected(tasks.every(task => task.order > 0));
  }, [tasks]);

  const handleCircleClick = (id: number) => {
    setTasks(prevTasks => {
      let newOrder = currentOrder;
      const clickedTask = prevTasks.find(task => task.id === id);
      if (!clickedTask) return prevTasks;

      const newTasks = prevTasks.map(task => {
        if (task.id === id) {
          if (task.order === 0) {
            // Assign the current order to the clicked task
            newOrder = currentOrder;
            setCurrentOrder(prevOrder => prevOrder + 0.5);
            return { ...task, order: newOrder };
          } else {
            // Remove the order from the clicked task
            const decreasedOrder = task.order;
            setCurrentOrder(prevOrder => prevOrder - 0.5);
            return { ...task, order: 0 };
          }
        }
        return task;
      });

      // Adjust the order of the remaining tasks
      const adjustedTasks = newTasks.map(task => {
        if (clickedTask.order > 0 && task.order > clickedTask.order) {
          return { ...task, order: task.order - 1 };
        }
        return task;
      });

      return adjustedTasks;
    });
  };

  

  const handleSubmit = () => {
    if (!allSelected) {
      setErrorMessage('Please select all the labels');
      return;
    }
    setErrorMessage(null);
    const sortedTasks = tasks.filter(task => task.order > 0).sort((a, b) => a.order - b.order);
    // update the database 
    const updateData = async () => {
        const docRef = doc(db, "event_test", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          //retrieve names of sorted tasks as string array
          const sortedTaskNames = sortedTasks.map(task => task.name);
          if (fetchedData.admin.email === userEmail) {
            //update admin.preferences to sortedTaskNames
            const updateData = {
              ...fetchedData,
              admin: {
                name: fetchedData.admin.name,
                email: fetchedData.admin.email,
                accepted: true,
                preferences: sortedTaskNames
              }
            };
            await updateDoc(docRef, updateData);
          } else {
            const updateData = {
             ...fetchedData,
              guests: fetchedData.guests.map((guest: GuestData) => {
                if (guest.email === userEmail) {
                  return {
                    name: guest.name,
                    email: guest.email,
                    accepted: true,
                    preferences: sortedTaskNames
                  }
                }
                return guest;
              })
            };
            await updateDoc(docRef, updateData);
          }
          
        } else {
          console.log("No such document!");
        }
    };

    updateData();
  };

  return (
    <>
    <Header />
    <div className={styles.container}>
      
      <Head>
        <title>Task Preferences</title>
        <meta name="description" content="Select your task preferences" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          First select your preferences for tasks
        </h1>
        <p className={styles.description}>
          Sort the labels in order of your preferences
        </p>

        <div className={styles.taskList}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.taskItem}>
              <span 
                className={`${styles.circle} ${task.order > 0 ? styles.filled : ''}`} 
                onClick={() => handleCircleClick(task.id)}
              >
                {task.order > 0 ? task.order : ''}
              </span>
              <span className={styles.taskName}>{task.name}</span>
            </div>
          ))}
        </div>

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        
        <Link href={`/events/${eventId}`}>
          <button onClick={handleSubmit} className={styles.button}>
            Proceed
          </button>
        </Link>
        
      </main>
    </div>
    </>
  );
};

export default Pref;
