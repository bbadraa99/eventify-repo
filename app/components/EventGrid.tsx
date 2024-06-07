import React from 'react';
import EventCard from './EventCard';
import styles from '../styles/Home.module.css';
import { templates } from '@/app/eventTemplate';

const EventGrid: React.FC = () => {
  return (
    <div className={styles.grid}>
      {templates.map((template, index) => (
        <EventCard
          key={index}
          template_id={template.id}
          title={template.title}
          description={template.description}
          imageSrc={template.imageSrc}
        />
      ))}
    </div>
  );
};

export default EventGrid;
