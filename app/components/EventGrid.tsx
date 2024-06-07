import React from 'react';
import EventCard from './EventCard';
import styles from '../styles/Home.module.css';
import { events } from '@/app/eventTemplate';

const EventGrid: React.FC = () => {
  return (
    <div className={styles.grid}>
      {events.map((event, index) => (
        <EventCard
          key={index}
          title={event.title}
          description={event.description}
          imageSrc={event.imageSrc}
        />
      ))}
    </div>
  );
};

export default EventGrid;
