'use client';
import React from 'react';
import Header from './components/Header';
import EventGrid from './components/EventGrid';
import styles from './styles/Home.module.css';
import Footer from './components/Footer';
import Image from 'next/image';

const Home: React.FC = () => {
  const scrollToMain = () => {
    document.getElementById('main-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='bg-background-10'>
      <div className="p-0">
        <Header />
        <div className={`${styles.hero} h-screen flex justify-center text-center`}>
          <div className='text-5xl text-white flex flex-col'>
            <h1 className='font-semibold mt-40 mb-10'>Automate Event <br /> Planning With Friends</h1>
            <p className='text-xl'>
              Effortlessly plan memorable events with friends using our 
              <br /> automated tools and templates for a stress-free experience.
            </p>
            <div className="mt-10">
              <button onClick={scrollToMain} className={`${styles.button} ${styles.tryItButton}`}>Try It</button>
            </div>
          </div>
        </div>
        <p className='my-56 text-center text-3xl'>Here will be app features</p>
        <p className='mb-56 text-center text-3xl'>Here will be info on how to use: steps</p>
        <div id="main-section" className={styles.main}>
          <h1 className="text-black text-3xl p-4">Event templates that you can use to create your own</h1>
          <EventGrid />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
