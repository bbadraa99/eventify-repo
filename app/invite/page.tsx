'use client';
import React, { useState } from 'react';
import Header from '../components/Header';

interface PropElements{
    updateEventData: (guests: GuestData[]) => void;
}
export interface GuestData{
    name: string, 
    email: string
}

const InvitePage = (props: PropElements) => {
    const [isInvite, setIsInvite] = useState(false);
    const [guests, setGuests] = useState([
        { name: "Yerlen", email: "yerlenExample@gmail.com" },
    ]);

    const [newGuestName, setNewGuestName] = useState("");
    const [newGuestEmail, setNewGuestEmail] = useState("");

    const openInvite = () => {
        setIsInvite(true);
    }

    const handleClose = () => {
        setIsInvite(false);
    }

    const handleInvite = () => {
        if (newGuestName && newGuestEmail) {
            setGuests([...guests, { name: newGuestName, email: newGuestEmail }]);
            setNewGuestName("");
            setNewGuestEmail("");
            setIsInvite(false);
        } else {
            alert("Please enter both name and email.");
        }
    }

    const sendInvitations = async () => {
        const emails = guests.map(guest => guest.email);
        try {
            const response = await fetch('/api/sendInvitations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emails })
            });
            const result = await response.json();
            if (response.ok) {
                alert('Invitations sent');
            } else {
                alert('Failed to send invitations: ' + result.message);
            }
            props.updateEventData(guests);
        } catch (error) {
            console.error('Error sending invitations:', error);
            alert('Error sending invitations');
        }
    }

    return (
        <div className='bg-background-10 h-screen'>
            <Header />
            <div className='flex flex-col center p-10'>
                <h1 className='bold-32 text-black'>Guest list</h1>
                <div className='p-10 space-y-6 flex flex-col center'>
                    <div className='overflow-x-auto w-full'>   
                        <table className='table regular-20 text-black'>
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
                                        <td>{guest.name}</td>
                                        <td>{guest.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className='btn bold-18 bg-background-10 text-black border-gray-300' onClick={openInvite}>Add a new guest</button>
                    <button className='btn bold-18 text-white bg-background-50 hover:bg-background-60 hover:text-background' onClick={sendInvitations}>Send invitations</button>
                </div>
            </div>
            {isInvite && 
            <div className='fixed inset-0 bg-black bg-opacity-50 center h-screen'>
                <div className='bg-white w-1/3 flex flex-col pt-20 px-20 pb-10 center space-y-4 rounded-xl z-10'>
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
