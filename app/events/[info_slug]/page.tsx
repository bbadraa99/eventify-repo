'use client';

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '@/app/components/Footer';
import Image from 'next/image'
import { EventData } from '../../[createEvent_slug]/page'
import { usePathname } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/config';


const Info = () => {
  const path = usePathname();
  const eventId = path.split("/")[2];

  const [event, setEvent] = useState<EventData>(
      {   id: "",
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
                id: docSnap.id,
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
  // const path = usePathname();

  const scrollToMain = () => {
    document.getElementById('checklist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <Header />
    <div className='h-full bg-background-10 mx-auto py-12 px-36 flex-col'>
        <div className='bg-background-40 flex flex-col md:flex-row font-serif text-black  py-6 gap-16 border-2 rounded-2xl justify-around'>
            <div className='flex-col space-y-6 w-1/2'>
                <h1 className='bold-32'>{event.title}</h1>
                <p className='regular-16'><span className='font-bold'>Date: </span> {formattedDate} </p>
                {/* <p className='regular-16 font-bold'>Event Description</p> */}
                <p className='regular-16'><b>Description:</b> {event.description}</p>
                <button onClick={scrollToMain} className='btn text-white bg-black'>View checklist</button>
            </div>
            <Image 
                src="/images/birthday-2.png" 
                width={400}
                height={400} 
                alt={''} 
                className='rounded-xl'
                objectFit='contain'/>
        </div>
        <div className='font-serif text-black py-6 my-12 flex-col bg-background-40 border-2 rounded-2xl'>
            <h1 className='bold-28 mb-7 ml-5 text-center'>Guests list</h1>
            <div className="overflow-x-auto mx-5">
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
        
        <div id='checklist-section' className='font-serif text-black py-6 mt-12 mb-48 flex-col bg-background-40 border-2 rounded-2xl'>
            <h1 className='bold-28 text-center mb-7 ml-5'>Task Distribution</h1>
            <div className="overflow-x-auto mx-5">
                <p className='text-xl mb-3'>Tasks assigned to you:</p>
                <table className="table ">
                    {/* head */}
                    <thead>
                    <tr className='text-black'>
                        <th></th>
                        <th>Task</th>
                        <th>Who will do</th>
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
                <p className='mt-10 text-xl mb-3'>Tasks of other guests:</p>
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className='text-black'>
                        <th></th>
                        <th>Task</th>
                        <th>Who will do</th>
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
    </>
  )
}

export default Info