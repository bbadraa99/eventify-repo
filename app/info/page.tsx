import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'

const info = () => {
  return (
    <div className='h-full bg-background-10 mx-auto px-36 flex-col'>
        <Header/>
        <div className='flex flex-col md:flex-row font-serif text-black py-6 gap-16' >
            <div className='flex-col space-y-6 w-1/2'>
                <h1 className='bold-32'>Mira's Birthday Party</h1>
                <p className='regular-16'><span className='font-bold'>Date: </span> 19 May </p>
                <p className='regular-16 font-bold'>Event Description</p>
                <p className='regular-16'>A vibrant celebration of youth and new beginnings, filled with laughter, music, and the warmth of loved ones gathering to honor this milestone moment in Mira's life as she embarks on the exciting journey of young adulthood. </p>
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
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>John Fish</td>
                        <td>john.fish@gmail.com</td>
                        <td>Not Invited</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>hart882@gmail.com</td>
                        <td>Invited</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Swyre191@gmail.com</td>
                        <td>Invited</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
  )
}

export default info