'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import logoImg from '@/public/images/logo.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <button className={styles.loginButton}>Log In</button>
    </header>
  );
};

export default Header;
