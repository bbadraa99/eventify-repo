import React from 'react';
import styles from '../styles/Home.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>e</div>
      <button className={styles.loginButton}>Log In</button>
    </header>
  );
};

export default Header;
