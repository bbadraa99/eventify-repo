import React from 'react';
import Header from './components/Header';
import EventGrid from './components/EventGrid';
import styles from './styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className="bg-background-10 p-2">
      <Header />
      <div className='h-screen px-10 pb-20 flex center'>
        <div className='bold-64 text-black flex flex-col text-center'>
          <h1>Make Memories, Not Plans</h1>
          <h1 className='regular-32 text-gray-600'>Automated Event Planning with Friends!</h1>
          <div className="animate-bounce pt-20">😇</div>
        </div>
        
      </div>
      <div className={styles.main}>
        <h1 className="text-black bold-32 p-4">Event templates that you can use to create your own</h1>
        <EventGrid />
      </div>
    </div>
  );
};

export default Home;

