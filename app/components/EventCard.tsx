'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

interface EventCardProps {
  template_id: number; 
  title: string;
  description: string;
  imageSrc: string;
}

const EventCard: React.FC<EventCardProps> = ({ template_id, title, description, imageSrc }) => {
  const [user] = useAuthState(auth);
  // console.log(user)

  return (
      <div className={styles.card}>
        <Image src={imageSrc} alt={title} className={styles.cardImage} width={400} height={400} />
        <div className={styles.cardInside}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p>{description}</p>
          
          <Link href={user ? `/createEvent_${template_id}` : "/sign-in/user"}>
            <button className={styles.getStartedLink}>Get Started</button>
          </Link> 
        </div>
    </div>
  );
};

export default EventCard;
