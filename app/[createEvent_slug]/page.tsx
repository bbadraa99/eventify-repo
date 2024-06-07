// pages/create-event.tsx
'use client';

import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Header from '../components/Header';
// import styles from './createEvent.module.css';
import { usePathname } from 'next/navigation'
import EventForm from '../components/EventForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { Timestamp } from 'firebase/firestore';
import { TaskElement } from '../eventTemplate';
import { FormData } from '../components/EventForm';
import Checklist from '../checklist/page';

export interface EventData {
  title: string,
  date: Date,
  description: string,
  template_id: string,
  admin: string,
  users: string[],
  tasks: TaskElement[]
}

const CreateEvent: React.FC = () => {
  const path = usePathname();
  const [admin] = useAuthState(auth);
  const id = path.charAt(path.length - 1);
  // console.log(admin)
  const [event, setEvent] = useState("form");
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    date: new Date(),
    description: "",
    template_id: id,
    admin: "",
    users: [],
    tasks: []
  });

  function handleClick(newEventData: FormData) {
    setEventData(prevEventData => ({
      ...prevEventData,
      title: newEventData.title,
      date: newEventData.date,
      description: newEventData.description
    }));
    setEvent("checklist")
  }
  console.log(eventData)

  return(
    <div>
      {event === "form" && <EventForm handleClick = {handleClick}></EventForm>}
      {event === "checklist" && <Checklist></Checklist>}
    </div>

  )

};

export default CreateEvent;
