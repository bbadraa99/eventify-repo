import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, imageSrc }) => {
  return (
      <div className={styles.card}>
        <Image src={imageSrc} alt={title} className={styles.cardImage} width={300} height={250} />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p>{description}</p>
        <div className={styles.getStartedLink}>
          <Link href="/createEvent">Get Started</Link>
        </div>
    </div>
  );
};

export default EventCard;
