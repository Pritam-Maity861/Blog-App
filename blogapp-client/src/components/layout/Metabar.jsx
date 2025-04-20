import React from 'react'
import {Link} from "react-router-dom"

export const Metabar = () => {

  

  
  return (
    <div className='flex justify-between p-6 w-[80%] container mx-auto'>
        <div>
        <Link to="/"><h1 className=''>Approach</h1></Link>
        </div>
        <div className='flex justify-center items-center  gap-6'>
        <button type='submit' className='px-4 py-1 rounded-full bg-gray-200'>Publish</button>
        
        <i className='fi fi-rr-menu-dots text-xl pt-1'></i>
        <i className='fi fi-rr-bell text-xl'></i>
        <i className='fi fi-rr-user text-xl'></i>
        </div>
        

    </div>
  )
}

