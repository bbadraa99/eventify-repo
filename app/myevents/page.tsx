'use client';

import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "@/app/components/Header";
import Footer from "../components/Footer";
import MyEvent from "../components/MyEvent";

export default function MyEventsPage() {
    const [user] = useAuthState(auth);

    const organizedEvents = [
        { id: 1, title: 'John\'s Birthday Party', date: 'June 15, 2024', organizer: 'John Doe', attendees: 20 },
        { id: 2, title: 'Summer Picnic', date: 'June 20, 2024', organizer: 'Jane Smith', attendees: 30 },
    ];
    
    const guestEvents = [
        { id: 3, title: 'Game Night at Bob\'s', date: 'June 25, 2024', organizer: 'Bob Johnson', attendees: 15 },
        { id: 4, title: 'Office Picnic', date: 'June 30, 2024', organizer: 'Alice Brown', attendees: 40 },
        { id: 5, title: 'Office Picnic', date: 'June 30, 2024', organizer: 'Alice Brown', attendees: 40 },

    ];

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
                                {organizedEvents.map((event) => (
                                    <MyEvent key={event.id} event={event} />
                                ))}
                            </ul>
                        </section>

                        <section className="w-full sm:w-1/2 pl-4 sm:pl-8 mt-8 sm:mt-0">
                            <h2 className="text-lg font-semibold mb-2">You are invited</h2>
                            <ul className="list-none pl-0">
                                {guestEvents.map((event) => (
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
