import Header from "./Header";
import styles from "./EventForm.module.css"
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Timestamp } from "firebase/firestore";
import { EventData } from "../[createEvent_slug]/page";

interface PropElements{
    handleClick: (newEventData: EventFormData) => void;
}

export interface EventFormData{
    title: string,
    description: string,
    date: Date
}

function EventForm(props: PropElements){

    const eventNameRef = useRef<HTMLInputElement>(null);
    const eventDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const eventDateRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (eventNameRef.current && eventDescriptionRef.current && eventDateRef.current) {
            const newEventData = {
                title: eventNameRef.current.value,
                description: eventDescriptionRef.current.value,
                date: new Date(eventDateRef.current.value), // Convert date string to Timestamp
            };
            props.handleClick(newEventData);
        }
    };

    return (
        <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
        <main className={styles.main}>
            <h1 className={styles.title}>Let's start with an organizer's information</h1>
            <div className={styles.formContainer}>
            <form className={styles.form}>

                <h2 className={styles.subtitle}>Event information</h2>
                <div className={styles.field}>
                <label htmlFor="eventName">Event name</label>
                <input ref = {eventNameRef} className={styles.textarea} type="text" id="eventName" name="eventName" />
                </div>

                <div className={styles.field}>
                <label htmlFor="eventDescription">Event description</label>
                <textarea ref = {eventDescriptionRef} className={styles.textarea} id="eventDescription" name="eventDescription" />
                </div>

                <div className={styles.field}>
                <label htmlFor="date">Date</label>
                <input ref = {eventDateRef} className={styles.textarea} type="date" id="date" name="date" />
                </div>
                <button onClick={handleButtonClick} className={styles.createLink}>Continue</button>
            </form>
            <div className={styles.imageContainer}>
                <Image src="/images/create-page.jpg" alt="Event illustration" width={450} height={300} />
                <Image src="/images/event2.jpg" alt="Event illustration 2" width={450} height={300} />
            </div>
            </div>
        </main>
        </div>
        </div>
  );
}

export default EventForm;