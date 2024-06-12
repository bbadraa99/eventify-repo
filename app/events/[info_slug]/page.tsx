'use client';

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '@/app/components/Footer';
import Image from 'next/image'
import { EventData } from '../../createEvent/[slug]/page'
import { usePathname } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase/config';
import matchingAlgo from '@/app/api/algorithms/matchingAlgo';
import { GuestData } from '@/app/components/InvitePage';
import TaskElement from '@/app/eventTemplate';
import { useAuthState } from 'react-firebase-hooks/auth';

interface ResultElement {
    [key: string]: TaskElement[];
}

const Info = () => {
    //retrieve user
    const [user, loading, error] = useAuthState(auth);
    
  const path = usePathname();
  const eventId = path.split("/")[2];

  const [result, setResult] = useState<ResultElement>()

  const [event, setEvent] = useState<EventData>({
          title: "",
          date: new Date(),
          deadline: new Date(),
          location: "",
          description: "",
          template_id: 0,
          admin: {
            name: "admin",
            email: "",
            accepted: false,
            preferences: [],
            tasks: [],
          },
          guests: [],
          tasks: [],
          isShow: false,
      }
  );
  
  useEffect(() => {
    
    let isRun = false;
    const fetchData = async () => {
        const docRef = doc(db, "event_test", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const fetchedData = docSnap.data();
            setEvent({
                title: fetchedData.title,
                date: fetchedData.date.toDate(),
                deadline: fetchedData.date.toDate(),
                description: fetchedData.description,
                location: fetchedData.location,
                template_id: fetchedData.template_id,
                admin: fetchedData.admin,
                guests: fetchedData.guests,
                tasks: fetchedData.tasks,
                isShow: fetchedData.isShow,
            });
            
            const currentDate = new Date();
            if(!fetchedData.isShow && 
                ((currentDate <= fetchedData.deadline) || 
                (fetchedData.admin.accepted && (fetchedData.guests.every((d:GuestData) => d.accepted === true) || fetchedData.guests.length === 0) ))){
                
                let users: GuestData[] = fetchedData.guests.slice();
                users.push(fetchedData.admin);
                const res = matchingAlgo({users, tasks: fetchedData.tasks});
                [...fetchedData.guests, fetchedData.admin].forEach((d:GuestData) => {
                    d.tasks = res[d.email];
                })
                const r = doc(db, "event_test", eventId);
                console.log(fetchedData);
                await updateDoc(r, {
                   ...fetchedData,
                    isShow: true,
                });
            }
        } else {
        console.log("No such document!");
        }
    };

    fetchData();

  }, [eventId]); 

  const formattedDate = new Date(event.date).toUTCString().slice(0, 16);

  const scrollToMain = () => {
    document.getElementById('checklist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <Header />
    <div className='h-full bg-background-10 mx-auto py-12 px-36 flex-col'>
        <div className='bg-background-40 flex flex-col md:flex-row font-serif text-black  py-6 px-20 gap-16 border-2 rounded-2xl justify-around'>
            <div className='flex-col space-y-6 w-1/2'>
                <h1 className='bold-32'>{event.title}</h1>
                <p className='regular-16'><span className='font-bold'>Date: </span> {formattedDate} </p>
                <p className='regular-16'><b>Location:</b> {event.location}</p>
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
        
        {event.isShow ? <div id='checklist-section' className='font-serif text-black py-6 mt-12 mb-48 flex-col bg-background-40 border-2 rounded-2xl'>
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
                        {[...event.guests, event.admin].map((guest, index) => {
                            if (user && user.email == guest.email){
                                return guest.tasks.map((task, taskIndex) => (
                                    <tr key={`${index}-${taskIndex}`}>
                                        <th>{taskIndex + 1}</th>
                                        <td>{task.text}</td> 
                                        <td>{guest.name}</td>
                                    </tr>
                                ));
                            }
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
                        {[...event.guests, event.admin].map((guest, index) => {
                            if (user && user.email != guest.email){
                                return guest.tasks.map((task, taskIndex) => (
                                    <tr key={`${index}-${taskIndex}`}>
                                        <th>{taskIndex + 1}</th>
                                        <td>{task.text}</td> 
                                        <td>{guest.name}</td>
                                    </tr>
                                ));
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div> : <p className='regular-16 text-black p-10'>Task distribution will be here soon...</p>}
    </div>
    </>
  )
}

export default Info