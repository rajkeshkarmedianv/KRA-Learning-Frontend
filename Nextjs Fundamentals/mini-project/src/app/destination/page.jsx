/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const city = ['Prayagraj','Lucknow','Nagpur']
    const router = useRouter()
  return (
    <div className='flex justify-center items-center text-black  h-full flex-col gap-4'>
        <div className='font-bold mt-20'>Choose Your Destination</div>
        <div  className='flex flex-col gap-4'>
             {city.map((d,i)=>(
            <div key={i} className=' font-bold text-2xl flex items-center justify-center rounded-2xl w-50 h-25 text-black bg-white hover:opacity-[0.5] transition-all' onClick={()=>router.push(`/destination/${d}`)}>
{d}
  </div>
        ))}
        </div>
           
        
      
    </div>
  )
}

export default page
