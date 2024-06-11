'use client';

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Image from 'next/image'
import { EventData } from '../../[createEvent_slug]/page'
import { usePathname } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';


const Info = () => {
  const path = usePathname();
  const eventId = path.split("/")[2];

  const [event, setEvent] = useState<EventData>(
      {
          title: "",
          date: new Date(),
          description: "",
          template_id: 0,
          admin: "",
          guests: [],
          tasks: [],
      }
  );

  useEffect(() => {
      const fetchData = async () => {
          const docRef = doc(db, "event_test", eventId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fetchedData = docSnap.data();
            setEvent({
                title: fetchedData.title,
                date: fetchedData.date.toDate(),
                description: fetchedData.description,
                template_id: fetchedData.template_id,
                admin: fetchedData.admin,
                guests: fetchedData.guests,
                tasks: fetchedData.tasks,
            });
          } else {
            console.log("No such document!");
          }
      };

      fetchData();
  }, [eventId]); 

  const formattedDate = new Date(event.date).toUTCString().slice(0, 16);

  return (
    <div className='h-full bg-background-10 mx-auto px-36 flex-col'>
        <Header/>
        <div className='flex flex-col md:flex-row font-serif text-black py-6 gap-16' >
            <div className='flex-col space-y-6 w-1/2'>
                <h1 className='bold-32'>{event.title}</h1>
                <p className='regular-16'><span className='font-bold'>Date: </span> {formattedDate} </p>
                <p className='regular-16'>{event.description}</p>
                <button className='btn text-white bg-black'>View checklist</button>
            </div>
            <Image 
                src="/images/birthday.png" 
                width={350}
                height={200} 
                alt={''} 
                className='rounded-xl'
                objectFit='contain'/>
        </div>
        <div className='font-serif text-black py-6 flex-col'>
            <h1 className='bold-28 text-left'>Guests list</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className='text-black'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        {event.guests.map((guest, index) => {
                            return (
                                <tr key={index}>
                                <th>{index+1}</th>
                                <td>{guest.name}</td>
                                <td>{guest.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
  )
}

export default Info