// pages/create-event.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import styles from './createEvent.module.css';

const CreateEvent: React.FC = () => {
  return (
    <div className={styles.container}>
    <Header />
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        <h1 className={styles.title}>Let's start with an organizer's information</h1>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <h2 className={styles.subtitle}>Event information</h2>
            <div className={styles.field}>
              <label htmlFor="eventName">Event name</label>
              <input type="text" id="eventName" name="eventName" />
            </div>
            <div className={styles.field}>
              <label htmlFor="eventDescription">Event description</label>
              <textarea id="eventDescription" name="eventDescription" />
            </div>
            <div className={styles.field}>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" />
            </div>
            <div className={styles.createLink}>
              <Link href="/checklist">Create</Link>
            </div>
          </form>
          <div className={styles.imageContainer}>
            <Image src="/images/create-page.jpg" alt="Event illustration" width={450} height={300} />
            <Image src="/images/event2.jpg" alt="Event illustration 2" width={450} height={300} />
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default CreateEvent;
