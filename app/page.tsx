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
      <div className="p-2">
        <Header />
        <div className='h-screen px-28 pb-20 mt-20 flex justify-between '>
          <div className='text-5xl text-black flex flex-col text-left'>
            <h1 className='font-medium mt-10 mb-10'>Automate Event <br /> Planning With Friends</h1>
            <p className='text-xl'>
              Effortlessly plan memorable events with friends using our 
              <br /> automated tools and templates for a stress-free experience.
            </p>
            <div className="mt-10">
              <button onClick={scrollToMain} className={`${styles.button} ${styles.tryItButton}`}>Try It</button>
            </div>
          </div>
          <div className='w-2/5 mr-5'>
            <Image 
              src="/images/picnic.png" 
              alt='Picnic image' 
              className='rounded-5xl '  // Added 'rounded-full' class for rounded image
              width={100}  // Set the appropriate width here
              height={100} // Set the appropriate height here
              layout="responsive" // Ensures the image scales correctly
            />
          </div>
        </div>
        <h2 className="mb-56 text-center text-2xl">Here will be info on how to use our app</h2>
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
