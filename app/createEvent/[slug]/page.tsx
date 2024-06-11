// pages/create-event.tsx
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'
import EventForm from '../../components/EventForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { TaskElement } from '../../eventTemplate';
import { EventFormData } from '../../components/EventForm';
import Checklist from '../../checklist/page';
import { templates } from '../../eventTemplate';
import InvitePage from '../../invite/page';
import { GuestData } from '../../invite/page';
import { db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export interface EventData {
  title: string,
  date: Date,
  description: string,
  template_id: number,
  admin: string,
  guests: GuestData[],
  tasks: TaskElement[]
}

const CreateEvent: React.FC = () => {
  const [admin] = useAuthState(auth);
  const path = usePathname();
  const router = useRouter();
  const template_id: number = parseInt(path.charAt(path.length - 1));
  const template_tasks: TaskElement[] = templates[template_id].tasks;
  

  const [eventCreationPage, setEventCreationPage] = useState("form");
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    date: new Date(),
    description: "",
    template_id: template_id,
    admin: admin?.email ?? "",
    guests: [],
    tasks: template_tasks
  });

  function handleFormSubmission(newEventData: EventFormData) {
    setEventData(prevEventData => ({
      ...prevEventData,
      title: newEventData.title,
      date: newEventData.date,
      description: newEventData.description
    }));
    setEventCreationPage("checklist")
  }

  function handleChecklistCreate(newTaskData: TaskElement[]) {
    setEventData(prevEventData => ({
      ...prevEventData,
      tasks: newTaskData
    }))
    setEventCreationPage("invite")
  }

  function handleSendInvitations(guests: GuestData[]) {
    setEventData(prevEventData => ({
      ...prevEventData,
      guests: guests
    }))
    saveEventToDatabase()
  }

  const saveEventToDatabase = async () => {
    try {
      const docRef = await addDoc(collection(db, "event_test"), eventData);
      router.push(`/events/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  console.log(eventData);

  return (
    <div>
      {eventCreationPage === "form" && <EventForm updateEventData={handleFormSubmission}></EventForm>}
      {eventCreationPage === "checklist" && <Checklist updateEventData={handleChecklistCreate} template_tasks={template_tasks}></Checklist>}
      {eventCreationPage === "invite" && <InvitePage updateEventData={handleSendInvitations}></InvitePage>}
    </div>
  )

};

export default CreateEvent;
