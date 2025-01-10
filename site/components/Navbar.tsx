import React from 'react'
import { Avatar } from '@radix-ui/react-avatar'

const Navbar = () => {
  return (
    <>
    <nav className='bg-white h-14 flex justify-between items-center pl-10 pr-10'>
        <h1 className='font-black'>SHARE BITE</h1>
        <div className="rounded-full bg-slate-400 w-8 h-8 flex justify-center items-center">U</div>
    </nav>
    </>
  )
}

export default Navbar