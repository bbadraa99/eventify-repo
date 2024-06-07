import React from 'react'

export const PrefSelection = () => {

    const tasks = ["Organize", "Decorate", "Book", "Invite"]
    return (
        <div className='h-screen bg-background-10'>
            <h1 className=''>Select your task preferences</h1>
            <ul>
                {tasks.map(task => (
                    <button className='btn'>{task}</button>
                ))}
            </ul>
        </div>
    )
}
