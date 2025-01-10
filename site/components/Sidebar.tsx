"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";



const sidebarweb = () => {



  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-white/60 flex flex-row items-center justify-around py-4 px-2">
        <Link href="/">
          <Button 
            className="w-24 h-12 text-center text-white"
          >
            HOME
          </Button>
        </Link>
        <Link href="/share">
          <Button 
            className="w-24 h-12 text-center text-white"
          >
            SHARE
          </Button>
        </Link>
        <Button 
          className="w-24 h-12 text-center text-white"
        >
          BOOKINGS
        </Button>
        <Button 
          className="w-24 h-12 text-center text-white"
        >
          DONATION
        </Button>
      </div>
    </div>
    </>
  );
};

export default sidebarweb;
