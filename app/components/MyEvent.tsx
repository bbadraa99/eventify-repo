import Link from 'next/link';

type Event = {
    id: number;
    title: string;
    date: string;
    organizer: string;
};

type MyEventProps = {
    event: Event;
};

export default function MyEvent({ event }: MyEventProps) {
    return (
        <li key={event.id} className="mb-4">
            {/* <Link href={`/events/${event.id}`}> */}
            <Link href={`/info/`}>
                <div className="block rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md cursor-pointer">
                    <h3 className="font-bold">{event.title}</h3>
                    <p>Date: {event.date}</p>
                    <p>Organizer: {event.organizer}</p>
                </div>
            </Link>
        </li>
    );
}