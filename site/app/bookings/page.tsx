import React from 'react'
import Bookingscard from '@/components/Bookingscard'

const page = () => {
  return (
    <>
        <div className="flex flex-col items-center min-h-screen py-8">
      <Bookingscard />
      <Bookingscard />
      <Bookingscard />
      <Bookingscard />
      <Bookingscard />
    </div>
    </>
  )
}

export default page