import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import logoImg from '@/public/images/logo.png';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
                <Image src={logoImg} alt="e logo" className={styles.logoImage} priority/>
                Eventify
            </Link>
      <button className={styles.loginButton}>Log In</button>
    </header>
  );
};

export default Header;
