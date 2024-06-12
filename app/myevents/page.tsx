'use client';

import { useState, useEffect, SetStateAction } from 'react';
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
    const [invitedEvents, setInvitedEvents] = useState<MyEventType[]>([]);

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (user) {
                const eventsRef = collection(db, 'event_test');
                const q = query(eventsRef, where('admin.email', '==', user.email));
                const querySnapshot = await getDocs(q);
                const eventsData = querySnapshot.docs.map((snapshot: QueryDocumentSnapshot) => {
                    const data = snapshot.data() as EventData;
                    data.date = (data.date as unknown as Timestamp).toDate(); // Convert Firestore Timestamp to Date
                    return { ...data, id: snapshot.id };
                });
                setUserEvents(eventsData);
            }
        };

        const fetchInvitedEvents = async () => {
            //if inside guests object list, the object.email == user.email
            if (user) {
                const eventsRef = collection(db, 'event_test');
                const querySnapshot = await getDocs(eventsRef);
                const eventsData: SetStateAction<MyEventType[]> = [];
                querySnapshot.docs.map((snapshot) => {
                    const data = snapshot.data() as EventData;
                    data.date = (data.date as unknown as Timestamp).toDate(); // Convert Firestore Timestamp to Date
                    for (const guest of data.guests) {
                        if (guest.email === user.email?.toString()) {
                            eventsData.push({ ...data, id: snapshot.id });
                            break; 
                        }
                    }
                });

                setInvitedEvents(eventsData);
            }
        };
            
        fetchInvitedEvents();
        fetchUserEvents();
    }, [user]);

    return (
        <div className="bg-background-10">
            <Header />
            <div className="flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-4xl mb-48 mt-16">
                    <h1 className="text-xl font-bold mb-4 text-black">Events</h1>
                    <div className="flex flex-wrap justify-between">
                        <section className="w-full sm:w-1/2 pr-4 sm:pr-8">
                            <h2 className="text-lg font-semibold mb-2 text-black">Organized by You</h2>
                            <ul className="list-none pl-0">
                                {userEvents.map((event) => { 
                                    var accept = false;
                                    var isGuest = false;
                                    // check whether the event is accepted by the user
                                    if (user && event.admin.email === user.email) {
                                        accept = event.admin.accepted;
                                        isGuest = false;
                                    }
                                    return (
                                    <MyEvent key={event.id} event={event} isAccepted ={accept} isGuest={isGuest}/>
                                    )
                                })}
                            </ul>
                        </section>
                        <section className="w-full sm:w-1/2 pl-4 sm:pl-8 mt-8 sm:mt-0">
                            <h2 className="text-lg font-semibold mb-2 text-black">You are invited</h2>
                            <ul className="list-none pl-0">
                                {invitedEvents.map((event) => {
                                    // check whether the event is accepted by the guests
                                    var accept = false;
                                    var isGuest = false;
                                    if (user) {
                                        for (const guest of event.guests) {
                                            if (guest.email === user.email?.toString()) {
                                                accept = guest.accepted;
                                                isGuest = true;
                                                break;
                                            }
                                        }
                                    }
                                    return (
                                    <MyEvent key={event.id} event={event} isAccepted ={accept} isGuest={isGuest}/>
                                    )
                                })}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
