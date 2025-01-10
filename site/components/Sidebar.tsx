import React from 'react'

const Sidebar = () => {
  return (
    <>
        <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-64 w-full  bg-gray-800 text-white flex flex-row lg:flex-col items-center lg:items-start p-4 space-x-4 lg:space-y-4 fixed lg:static bottom-0 lg:h-screen justify-center lg:justify-start">
            <div className="text-center lg:text-left">Icon 1</div>
            <div className="text-center lg:text-left">Icon 2</div>
            <div className="text-center lg:text-left">Icon 3</div>
            <div className="text-center lg:text-left">Icon 4</div>
        </div>
        </div>
    </>
    
  )
}

export default Sidebar