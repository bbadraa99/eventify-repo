import React from 'react'
import Header from '../components/Header';

const PrefSelection = () => {

    const tasks = ["Organize", "Decorate", "Book", "Invite"]
    return (
        <div className='h-screen bg-background-10'>
            <Header/>
            <div className='flex flex-col items-center'>
                <div className='w-1/2 center flex flex-col'>
                    <h1 className='bold-32 text-black py-10 pt-32'>Select your task preferences</h1>
                    <div className='flex flex-col w-1/2 space-y-4'>
                        {tasks.map(task => (
                            <button className='btn w-full bg-background-10 regular-20 text-black hover:bg-opacity-50 hover:text-white'>{task}</button>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}

export default PrefSelection;