'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import logoImg from '@/public/images/logo.png';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();


  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
        sessionStorage.removeItem('user');
        router.push('/'); 
    })
    .catch((error) => {
        console.error("Sign out error", error);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Link className={styles.logo} href="/">
        <Image src={logoImg} alt="e logo" className={styles.logoImage} priority />
        <span className={styles.logoText}>ventify</span>
      </Link>
      { user? 
        <div className='flex flex-row center space-x-4'>
          <p>{user.email}</p>
          <Link href="/myevents">
            <button className="btn regular-16 text-black border-2 bg-transparent hover:bg-gray-300">My Eventss</button>
          </Link> 
          <Link href="/sign-in">
            <button className="btn regular-16 text-black border-2 bg-transparent hover:bg-gray-300" onClick={handleSignOut}>Sign Out</button>
          </Link> 
        </div> : 
        <Link href="/sign-in/user">
          <button className="btn regular-16 text-black border-2 bg-transparent hover:bg-gray-300">Sign In</button>
        </Link> 
      }
      
    </header>
  );
};

export default Header;