'use client'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header';

const InvitePage = () => {

    const [isInvite, setIsInvite] = useState(false);


    const openInvite = () => {
        setIsInvite(true);
    }

    const handleClose = () => {
        setIsInvite(false);
    }

    const handleInvite = () => {
        setIsInvite(false);
    }
  return (
    <div className='bg-background-10 h-screen'>
        <Header/>
        <div className='flex flex-col center p-10'>
            <h1 className='bold-32 text-black'>Guest list</h1>
            <div className='p-10 space-y-6 flex flex-col center'>
                <div className="overflow-x-auto w-full">   
                    <table className="table regular-20 text-black">
                        {/* head */}
                        <thead>
                        <tr className='bold-20 text-black'>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr >
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>gande889@gmail.com</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>hagertyHart9@gmail.com</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>brice@unist.ac.kr</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>4</th>
                            <td>Brice Swyre</td>
                            <td>brice@unist.ac.kr</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>5</th>
                            <td>Brice Swyre</td>
                            <td>brice@unist.ac.kr</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <button className='btn bold-18 bg-background-10 text-black hover:text-background-10' onClick={openInvite}>Invite a new guest</button>
            </div>
        </div>
        
        {isInvite && 
        <div className='fixed inset-0 bg-black bg-opacity-50 center h-screen'>
            <div className='bg-white w-1/3 flex flex-col pt-20 px-20 pb-10 center space-y-4 rounded-xl z-10'>
                <label className="input input-bordered flex w-5/6 items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Name" />
                </label>
                <label className="input input-bordered flex w-5/6 items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Email" />
                </label>
                <div className='flex felx-row space-x-4'>
                    <button className='btn regular-20 w-1/2 bg-background-10 text-black hover:text-gray-300' onClick={handleClose}>Close</button>
                    <button className='btn bold-20 w-1/2 bg-background-10 text-black hover:text-white hover:bg-green-50' onClick={handleInvite}>Invite</button>
                </div>
                
                
            </div>
        </div>
        }
    </div>
    
  )
}

export default InvitePage;
