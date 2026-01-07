/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Prayagraj from '@/assets/prayagraj.webp'
import Prayagraj1 from '@/assets/nagpur-1.jpg'
import Prayagraj2 from '@/assets/lucknow.jpg'

 
const page = ({params}) => {
    const {city} = useParams()
  return (
    <div className='text-black mt-50'>
        <div>{city} is a Beautiful city</div>

        {city==='Prayagraj' && <Image src={Prayagraj} alt='Prayagraj' width={200} height={200}/>}
        {city==='Nagpur' && <Image src={Prayagraj1} alt='Nagpur' width={200} height={200}/>}
        {city==='Lucknow' &&<Image src={Prayagraj2} alt='Lucknow' width={200} height={200}/>}
      
    </div>
  )
}

export default page
