'use client';

import React, { useEffect, useReducer, useState } from 'react'
import Header from '../../components/Header'
import Image from 'next/image'
import { EventData } from '../../[createEvent_slug]/page'
import fetchEventData from '@/app/api/eventData/fetchEventData';
import { usePathname } from 'next/navigation';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface PropElements{

}

const Info = () => {
  const path = usePathname();
  const eventId = path.split("/")[1];

  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await fetchEventData(eventId);
      setEvent(eventData);
    };
    fetchData();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  // const event = fetchEventData(eventId);
  // console.log(event)

  // const event = {
  //   title: "",
  //   date: new Date(),
  //   description: "",
  //   template_id: 1,
  //   admin: "",
  //   guests: [],
  //   tasks: []
  // }

  console.log("Event:" + event);

  const formattedDate = `${event.date.toUTCString().slice(0, 16)}`;
  // const path = usePathname();

  return (
    <div className='h-full bg-background-10 mx-auto px-36 flex-col'>
        <Header/>
        <div className='flex flex-col md:flex-row font-serif text-black py-6 gap-16' >
            <div className='flex-col space-y-6 w-1/2'>
                <h1 className='bold-32'>{event.title}</h1>
                <p className='regular-16'><span className='font-bold'>Date: </span> {formattedDate} </p>
                {/* <p className='regular-16 font-bold'>Event Description</p> */}
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
                                {/* <td>{guest.name}</td>
                                <td>{guest.email}</td> */}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { slug } = context.params!;
//   const res = await fetchEventData(slug as string);
//   const data = await res.json();

//   if (res.status !== 200) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       event: data,
//     },
//   };
// };