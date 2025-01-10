"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";



const Sidebar = () => {



  return (
    <>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-64 w-full backdrop-blur-md bg-white/30 text-white flex flex-row lg:flex-col items-center lg:items-start p-4 space-x-4 lg:space-y-4 fixed lg:static bottom-0 lg:h-screen justify-center lg:justify-start">
          <Link href="/"><Button className="w-24 h-12 text-center lg:text-left">HOME</Button></Link>
          <Link href="/share"><Button className="w-24 h-12 text-center lg:text-left">SHARE</Button></Link>
          <Button className="w-24 h-12 text-center lg:text-left">BOOKINGS</Button>
          <Button className="w-24 h-12 text-center lg:text-left">DONATION</Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
