import React from 'react';
import Header from './components/Header';
import EventGrid from './components/EventGrid';
import styles from './styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Event templates that you can use to create your own</h1>
        <EventGrid />
      </main>
    </div>
  );
};

export default Home;

