import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { GuestData } from './InvitePage';
import Pref from '../events/[info_slug]/pref/page';


export interface MyEventType{
    guests: GuestData[];
    id: string; 
    title: string;
    date: Date;
    admin: GuestData;
};

type MyEventProps = {
    event: MyEventType;
    isAccepted: boolean;
    isGuest: boolean;
};

export default function MyEvent(props : MyEventProps) {
    //get user
    const [user] = useAuthState(auth);
    const userEmail = user?.email;
    const message = props.isAccepted ? "Accepted" : "Show" 

    return (
        <li key={1} className="mb-4">
            <Link href={props.isAccepted ? `/events/${props.event.id}` : `/events/${props.event.id}/pref`}>
                <div className="block rounded-lg p-4 bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out shadow-md cursor-pointer flex flexBetween">
                    <div>
                        <h3 className="font-bold text-black bold-16">{props.event.title}</h3>
                        <p className='text-black regular-16'>Date: {props.event.date.toDateString()}</p>
                        <p className='text-black regular-16'>Organizer: {props.event.admin.name}</p>
                    </div>
                    <div className='btn bg-transparent text-black regular-16 hover:bg-transparent'>{message}</div>
                    
                </div>
            </Link>
        </li>
    );
}