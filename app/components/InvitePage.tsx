'use client';
import React, { useState } from 'react';
import Header from './Header';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import styles from './invite.module.css';
import TaskElement from '../eventTemplate';

interface PropElements {
    updateEventData: (guests: GuestData[]) => void;
}
export interface Organizer {
    email: string;
}

export interface GuestData {
    name: string,
    email: string,
    accepted: boolean,
    preferences: string[];
    tasks: TaskElement[];
}

const InvitePage = (props: PropElements) => {
    const [isInvite, setIsInvite] = useState(false);
    const [user] = useAuthState(auth);

    const [guests, setGuests] = useState([
        { name: "Aibek", email: "aibekminbaev050402@gmail.com", accepted: false, preferences: [], tasks: [] },
    ]);

    const [newGuestName, setNewGuestName] = useState("");
    const [newGuestEmail, setNewGuestEmail] = useState("");
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editGuestName, setEditGuestName] = useState("");
    const [editGuestEmail, setEditGuestEmail] = useState("");
    const [editGuestAccepted, setEditGuestAccepted] = useState(false);
    const [editGuestPreferences, setEditGuestPreferences] = useState<string[]>([]);

    const openInvite = () => {
        setIsInvite(true);
    }

    const handleClose = () => {
        setIsInvite(false);
    }

    const handleInvite = () => {
        if (newGuestName && newGuestEmail) {
            setGuests([...guests, { name: newGuestName, email: newGuestEmail, accepted: false, preferences: [], tasks: [] }]);
            setNewGuestName("");
            setNewGuestEmail("");
            setIsInvite(false);
        } else {
            alert("Please enter both name and email.");
        }
    }

    const handleDelete = (index: number) => {
        setGuests(guests.filter((_, i) => i !== index));
    }

    const handleEdit = (index: number) => {
        setIsEditing(index);
        setEditGuestName(guests[index].name);
        setEditGuestEmail(guests[index].email);
    }

    const handleCancelEdit = () => {
        setIsEditing(null);
    }

    const handleSaveEdit = (index: number) => {
        const updatedGuests = guests.map((guest, i) => 
            i === index ? {...guest, name: editGuestName, email: editGuestEmail } : guest
        );
        setGuests(updatedGuests);
        setIsEditing(null);
    }

    const sendInvitations = async () => {
        const response = await fetch('/api/sendInvitations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guests, organizer: { email: user ? user.email : "Anon" } })
        });

        if (!response.ok) {
            if (response.status === 0) {
                alert('Failed to send invitations: Network error. Please check your internet connection.');
            } else {
                const result = await response.json();
                alert('Failed to send invitations: ' + result.message);
            }
        } else {
            alert('Invitations sent');
            props.updateEventData(guests);
        }
    }

    return (
        <div className='bg-background-10 min-h-screen flex flex-col'>
            <Header />
            <div className='flex flex-col items-center p-10 flex-grow'>
                <div className='w-full max-w-3xl'>
                    <div className='flex justify-between items-center mx-12'>
                        <h1 className='bold-28 text-black'>Guest list</h1>
                        <button className='btn bold-18 bg-background-10 text-black border-gray-300' onClick={openInvite}>Add a new guest</button>
                    </div>
                    <div className='py-5 px-10 space-y-6 flex flex-col items-center'>
                        <div className='overflow-x-auto bg-background-90 w-full border-2 rounded-xl mb-5'>
                            <table className={`${styles.table} table regular-20 text-black`}>
                                <thead>
                                    <tr className='bold-20 text-black'>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guests.map((guest, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                {isEditing === index ? (
                                                    <textarea value={editGuestName} onChange={(e) => setEditGuestName(e.target.value)} autoFocus />
                                                ) : (
                                                    guest.name
                                                )}
                                            </td>
                                            <td>
                                                {isEditing === index ? (
                                                    <textarea value={editGuestEmail} onChange={(e) => setEditGuestEmail(e.target.value)} />
                                                ) : (
                                                    guest.email
                                                )}
                                            </td>
                                            <td className='flex space-x-2'>
                                                {isEditing === index ? (    
                                                    <div className='text-base'>
                                                        <button className={`${styles.saveButton} btn-icon`} onClick={() => handleSaveEdit(index)}>
                                                            Save
                                                        </button>
                                                        <button className={`${styles.cancelButton} btn-icon`} onClick={handleCancelEdit}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button className='btn-icon' onClick={() => handleEdit(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                            </svg>
                                                        </button>
                                                        <button className='btn-icon' onClick={() => handleDelete(index)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                            </svg>
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className='btn bold-18 text-white bg-background-50 hover:bg-background-60 hover:text-background' onClick={sendInvitations}>Create an event</button>
                    </div>
                </div>
            </div>

            {isInvite &&
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen'>
                    <div className='bg-white w-1/3 flex flex-col pt-20 px-20 pb-10 items-center space-y-4 rounded-xl z-10'>
                        <label className="input input-bordered flex w-5/6 items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Name"
                                value={newGuestName}
                                onChange={(e) => setNewGuestName(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex w-5/6 items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                value={newGuestEmail}
                                onChange={(e) => setNewGuestEmail(e.target.value)}
                            />
                        </label>
                        <div className='flex flex-row space-x-4'>
                            <button className='btn regular-20 w-1/2 bg-background-10 text-black' onClick={handleClose}>Close</button>
                            <button className='btn bold-20 w-1/2 bg-background-10 text-black hover:text-white hover:bg-green-50' onClick={handleInvite}>Add</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default InvitePage;
