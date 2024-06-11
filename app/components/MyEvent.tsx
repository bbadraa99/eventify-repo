import Link from 'next/link';

export interface MyEventType{
    id: string; 
    title: string;
    date: Date;
    admin: string;
};

type MyEventProps = {
    event: MyEventType;
};

export default function MyEvent({ event }: MyEventProps) {
    return (
        <li key={1} className="mb-4">
            {/* <Link href={`/events/${event.id}`}> */}
            <Link href={`/events/${event.id}`}>
                <div className="block rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md cursor-pointer">
                    <h3 className="font-bold">{event.title}</h3>
                    <p>Date: {event.date.toDateString()}</p>
                    <p>Organizer: {event.admin}</p>
                </div>
            </Link>
        </li>
    );
}