import Image from "next/image";
import { Capacitor } from '@capacitor/core';
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export default function HomePage(platform: string) {

  return (
    <>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <h1>{platform}</h1>
    </>
  );
}
