import React from 'react';
import EventCard from './EventCard';
import styles from '../styles/Home.module.css';

const events = [
  { title: 'Birthday Party', description: 'Celebrate another year of life with loved ones!', imageSrc: '/images/birthday.png' },
  { title: 'Wedding', description: 'Unite two hearts in love, surrounded by family & friends.', imageSrc: '/images/wedding.jpg' },
  { title: 'Graduation', description: 'Celebrate academic achievements with others.', imageSrc: '/images/graduation.jpg' },
  { title: 'Baby Shower', description: 'Welcome a little bundle of joy with heartfelt celebrations!', imageSrc: '/images/baby-shower.png' },
  { title: 'Housewarming', description: 'Embrace a fresh start in a new home together!', imageSrc: '/images/housewarming.png' },
  { title: 'Retirement', description: 'Celebrate a lifetime of hard work and new beginnings!', imageSrc: '/images/retirement.png' },
];

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
