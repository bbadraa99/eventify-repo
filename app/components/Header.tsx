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

  // useEffect(() => {
  //     if (!user) {
  //         router.push('/');
  //     }
  // }, [user, router]);

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
          <p className='regular-16 text-black'>{user.email}</p> 
          <Link href="/sign-in">
            <button className={styles.loginButton} onClick={handleSignOut}>Sign Out</button>
          </Link> 
        </div> : 
        <Link href="/sign-in">
          <button className={styles.loginButton}>Sign In</button>
        </Link>
      }
      
    </header>
  );
};

export default Header;
