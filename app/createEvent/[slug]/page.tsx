// pages/create-event.tsx
'use client';

import React, { useRef, useState } from 'react';
import { usePathname } from 'next/navigation'
import EventForm from '../../components/EventForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import TaskElement from '../../eventTemplate';
import { EventFormData } from '../../components/EventForm';
import Checklist from '../../components/Checklist';
import { templates } from '../../eventTemplate';
import InvitePage from '../../components/InvitePage';
import { GuestData } from '../../components/InvitePage';
import { db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export interface EventData {
  title: string,
  date: Date,
  deadline: Date,
  location: string,
  description: string,
  template_id: number,
  admin: GuestData,
  guests: GuestData[],
  tasks: TaskElement[],
  isShow: boolean,
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
    deadline: new Date(),
    location: "",
    description: "",
    template_id: template_id,
    admin: {
      name: "admin",
      email: admin && admin.email ? admin.email : "",
      accepted: false,
      preferences: [],
      tasks: template_tasks,
    },
    guests: [],
    tasks: template_tasks,
    isShow: false,
  });

  function handleFormSubmission(newEventData: EventFormData) {
    setEventData(prevEventData => ({
      ...prevEventData,
      admin: {
        ...prevEventData.admin,
        name: newEventData.admin_name,
      } ,
      title: newEventData.title,
      description: newEventData.description,
      location: newEventData.location,
      date: newEventData.date,
      deadline: newEventData.deadline,
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
    const eventDataWithGuests = eventData;
    eventDataWithGuests.guests = guests;
    console.log(eventDataWithGuests);
    saveEventToDatabase(eventDataWithGuests);
  }

  const saveEventToDatabase = async (data: EventData) => {
    const docRef = await addDoc(collection(db, "event_test"), data);
    router.push(`/events/${docRef.id}/pref`);
    
  };

  return (
    <div>
      {eventCreationPage === "form" && <EventForm updateEventData={handleFormSubmission}></EventForm>}
      {eventCreationPage === "checklist" && <Checklist updateEventData={handleChecklistCreate}></Checklist>}
      {eventCreationPage === "invite" && <InvitePage updateEventData={handleSendInvitations}></InvitePage>}
    </div>
  )

};

export default CreateEvent;
