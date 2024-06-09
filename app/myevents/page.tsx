'use client';

import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "@/app/components/Header";
import Link from 'next/link';

export default function MyEventsPage() {
    const [user] = useAuthState(auth);

    const organizedEvents = [
        { id: 1, title: 'John\'s Birthday Party', date: 'June 15, 2024', organizer: 'John Doe', attendees: 20 },
        { id: 2, title: 'Summer Picnic', date: 'June 20, 2024', organizer: 'Jane Smith', attendees: 30 },
    ];
    
    const guestEvents = [
        { id: 3, title: 'Game Night at Bob\'s', date: 'June 25, 2024', organizer: 'Bob Johnson', attendees: 15 },
        { id: 4, title: 'Office Picnic', date: 'June 30, 2024', organizer: 'Alice Brown', attendees: 40 },
    ];

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center">
                <div className="bg-white p-6 rounded-lg shadow-md w-full sm:max-w-md">
                    <h1 className="text-xl font-bold mb-4">Events</h1>

                    <section>
                        <h2 className="text-lg font-semibold mb-2">Organized by You</h2>
                        <ul className="list-none pl-0">
                            {organizedEvents.map((event) => (
                                <li key={event.id} className="mb-4">
                                    <Link href={`/events/${event.id}`}>
                                        <div className="block rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md cursor-pointer">
                                            <h3 className="font-bold">{event.title}</h3>
                                            <p>Date: {event.date}</p>
                                            <p>Organizer: {event.organizer}</p>
                                            <p>Attendees: {event.attendees}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mt-8 mb-2">Invited</h2>
                        <ul className="list-none pl-0">
                            {guestEvents.map((event) => (
                                <li key={event.id} className="mb-4">
                                    <Link href={`/events/${event.id}`}>
                                        <div className="block rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md cursor-pointer">
                                            <h3 className="font-bold">{event.title}</h3>
                                            <p>Date: {event.date}</p>
                                            <p>Organizer: {event.organizer}</p>
                                            <p>Attendees: {event.attendees}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
