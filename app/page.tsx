'use client';
import React from 'react';
import Header from './components/Header';
import EventGrid from './components/EventGrid';
import styles from './styles/Home.module.css';
import Footer from './components/Footer';
import Image from 'next/image';
import { MdAutoFixHigh } from "react-icons/md";
import { MdSafetyDivider } from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

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

        <div className='flex flex-row space-x-16 regular-20 text-black center py-48'>
          <div className='flex flex-col center bg-white rounded-xl p-10 h-[300px] w-[300px]'>
            <MdAutoFixHigh size={100}/>
            <p className='pt-10 text-center'> Effortless event organization with <span className='bold-20'>database</span> of tasks</p>
          </div>
          <div className='flex flex-col center bg-white rounded-xl p-10 h-[300px] w-[300px]'>
            <MdSafetyDivider size={120}/>
            <p className='pt-10 text-center'> <span className='bold-20'>Automatic task division</span> among friends</p>
          </div>
          <div className='flex flex-col center bg-white rounded-xl p-10 h-[300px] w-[300px]'>
            <PiTargetBold size={100} />
            <p className='pt-10 text-center'><span className='bold-20'>Smart</span> decision making algorithm that handles edge cases</p>
          </div>
        </div>

        <div className='flex flex-col pb-32'>
          <p className='pb-20 text-center bold-46 text-black'>How to use eventify</p>
          <div className='space-x-10 regular-24 flex flex-row center'>
            <div className='rounded-xl bg-white w-fit p-4 text-black'>
             <span className='font-bold'>1.</span> Fill out the event form
            </div>
            <FaArrowRight size={30} color='black'/>
            <div className='rounded-xl bg-white w-fit p-4 text-black'>
             <span className='font-bold'>2.</span> Finalize the task list
            </div>
            <FaArrowRight size={30} color='black'/>
            <div className='rounded-xl bg-white w-fit p-4 text-black'>
             <span className='font-bold'>3.</span> Invite your friends
            </div>
          </div>
          <div className='flex flex-col center py-10'>
            <p className='py-10 text-center regular-24 text-black'>You are all set!</p>
            <FaStar size={50} color='black' className='text-center animate-bounce'/>
          </div>

        </div>
        <div id="main-section" className={styles.main}>
          <h1 className="text-black font-semibold text-3xl p-4">Event templates that you can use to create your own</h1>
          <EventGrid />
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default Home;
