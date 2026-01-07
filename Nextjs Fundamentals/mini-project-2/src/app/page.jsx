import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/shop'>Go to Shop Page</Link>
      
    </div>
  )
}

export default page
