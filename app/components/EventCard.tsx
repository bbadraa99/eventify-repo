'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

interface EventCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, imageSrc }) => {
  const [user] = useAuthState(auth);
  // const router = useRouter();
  console.log(user)

  return (
      <div className={styles.card}>
        <Image src={imageSrc} alt={title} className={styles.cardImage} width={300} height={250} />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p>{description}</p>
        
        <Link href={user ? "/createEvent" : "/sign-in"}>
          <button className={styles.getStartedLink}>Get Started</button>
        </Link> 
    </div>
  );
};

export default EventCard;
