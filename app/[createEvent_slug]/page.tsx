// pages/create-event.tsx
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'
import EventForm from '../components/EventForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { TaskElement } from '../eventTemplate';
import { EventFormData } from '../components/EventForm';
import Checklist from '../checklist/page';
import { templates } from '../eventTemplate';
import Info from '../info/page';
import InvitePage from '../invite/page';

export interface EventData {
  title: string,
  date: Date,
  description: string,
  template_id: number,
  admin: string,
  users: string[],
  tasks: TaskElement[]
}

const CreateEvent: React.FC = () => {
  const path = usePathname();
  const [admin] = useAuthState(auth);
  const template_id: number = parseInt(path.charAt(path.length - 1));
  const template_tasks: TaskElement[] = templates[template_id].tasks

  const [event, setEvent] = useState("form");
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    date: new Date(),
    description: "",
    template_id: template_id,
    admin: "",
    users: [],
    tasks: template_tasks
  });

  function handleFormSubmission(newEventData: EventFormData) {
    setEventData(prevEventData => ({
      ...prevEventData,
      title: newEventData.title,
      date: newEventData.date,
      description: newEventData.description
    }));
    setEvent("checklist")
  }

  function handleChecklistCreate(){
    setEvent("invite")
  }

  return(
    <div>
      {event === "form" && <EventForm handleClick = {handleFormSubmission}></EventForm>}
      {event === "checklist" && <Checklist handleClick = {handleChecklistCreate} template_tasks={template_tasks}></Checklist>}
      {event === "invite" && <InvitePage></InvitePage>}
      {event === "info" && <Info></Info>}
    </div>

  )

};

export default CreateEvent;
