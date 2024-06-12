'use client';

import Header from "./Header";
import styles from "./EventForm.module.css"
import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface PropElements{
    updateEventData: (newEventData: EventFormData) => void;
}

export interface EventFormData{
    admin_name: string,
    title: string,
    location: string,
    description: string,
    date: Date,
    deadline: Date
}

function EventForm(props: PropElements){
    const path = usePathname();
    const template_id: number = parseInt(path.charAt(path.length - 1));
    var imgSrc = "/images/birthday-2.png";
    if (template_id === 1) {
        imgSrc = "/images/game-night.png"
    } else if (template_id === 2) {
        imgSrc = "/images/picnic-2.png"
    }

    const userNameRef = useRef<HTMLInputElement>(null);
    const eventNameRef = useRef<HTMLInputElement>(null);
    const eventDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const eventDateRef = useRef<HTMLInputElement>(null);
    const eventLocationRef = useRef<HTMLInputElement>(null);
    const eventDeadlineRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        
        if(!userNameRef.current || !userNameRef.current.value || userNameRef.current.value===""  || !eventNameRef.current || !eventNameRef.current.value || eventNameRef.current.value === ""
        || !eventDescriptionRef.current || !eventDescriptionRef.current.value || eventDescriptionRef.current.value === ""
        || !eventDateRef.current || !eventDateRef.current.value || eventDateRef.current.value === ""
        || !eventDeadlineRef.current || !eventDeadlineRef.current.value || eventDeadlineRef.current.value === ""
        || !eventLocationRef.current || !eventLocationRef.current.value || eventLocationRef.current.value === ""){
            setErrorMessage('All fields are required.');
            return;
        }
        if(eventDateRef.current.value <= eventDeadlineRef.current.value){
            setErrorMessage('Deadline should be before Date of event');
            return;
        }
        
        const newEventData = {
            admin_name: userNameRef.current.value,
            title: eventNameRef.current.value,
            description: eventDescriptionRef.current.value,
            location: eventLocationRef.current.value,
            date: new Date(eventDateRef.current.value), // Convert date string to Timestamp
            deadline: new Date(eventDeadlineRef.current.value)
        };
        props.updateEventData(newEventData);
        setErrorMessage('');
    };

    return (
        <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
        <main className={styles.main}>
            <div className={styles.formContainer}>
            <form className={styles.form}>

                <h2 className={styles.subtitle}>Event information</h2>
                <div className={styles.field}>
                <label htmlFor="eventName">Full name (user)</label>
                <input ref = {userNameRef} className={styles.textarea} type="text" id="userName" name="userName" />
                </div>

                <div className={styles.field}>
                <label htmlFor="eventName">Event name</label>
                <input ref = {eventNameRef} className={styles.textarea} type="text" id="eventName" name="eventName" />
                </div>

                <div className={styles.field}>
                <label htmlFor="eventDescription">Event description</label>
                <textarea ref = {eventDescriptionRef} className={styles.textarea} id="eventDescription" name="eventDescription" />
                </div>

                <div className={styles.field}>
                <label htmlFor="location">Location</label>
                <input ref = {eventLocationRef} className={styles.textarea} type="text" id="location" name="location" />
                </div>

                <div className={styles.field}>
                <label htmlFor="date">Date</label>
                <input ref = {eventDateRef} className="text-black bg-white" type="datetime-local" id="date" name="date" />
                </div>

                <div className={styles.field}>
                <label htmlFor="deadline">Acceptance Deadline</label>
                <input ref = {eventDeadlineRef} className="text-black bg-white" type="datetime-local" id="deadline" name="deadline" />

                </div>
                <button onClick={handleButtonClick} className={styles.createLink}>Continue</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
            <div className={styles.imageContainer}>
                <Image src={imgSrc} alt="Event illustration" width={450} height={300} />
            </div>
            </div>
        </main>
        </div>
        </div>
  );
}

export default EventForm;