'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '@/app/components/Header';
import Footer from '../components/Footer';
import MyEvent, { MyEventType } from '../components/MyEvent';
import { EventData } from '../createEvent/[slug]/page';
import { collection, query, where, getDocs, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/app/firebase/config';

export default function MyEventsPage() {
    const [user] = useAuthState(auth);
    const [userEvents, setUserEvents] = useState<MyEventType[]>([]);

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (user) {
                const eventsRef = collection(db, 'event_test');
                const q = query(eventsRef, where('admin', '==', user.email));
                const querySnapshot = await getDocs(q);
                const eventsData = querySnapshot.docs.map((snapshot: QueryDocumentSnapshot) => {
                    const data = snapshot.data() as EventData;
                    data.date = (data.date as unknown as Timestamp).toDate(); // Convert Firestore Timestamp to Date
                    return { ...data, id: snapshot.id };
                });
                setUserEvents(eventsData);
            }
        };

        fetchUserEvents();
    }, [user]);

    return (
        <div className="bg-background-10">
            <Header />
            <div className="flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-4xl mb-48 mt-16">
                    <h1 className="text-xl font-bold mb-4">Events</h1>
                    <div className="flex flex-wrap justify-between">
                        <section className="w-full sm:w-1/2 pr-4 sm:pr-8">
                            <h2 className="text-lg font-semibold mb-2">Organized by You</h2>
                            <ul className="list-none pl-0">
                                {userEvents.map((event) => (
                                    <MyEvent key={event.id} event={event} />
                                ))}
                            </ul>
                        </section>
                        <section className="w-full sm:w-1/2 pl-4 sm:pl-8 mt-8 sm:mt-0">
                            <h2 className="text-lg font-semibold mb-2">You are invited</h2>
                            <ul className="list-none pl-0">
                                {userEvents.map((event) => (
                                    <MyEvent key={event.id} event={event} />
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
