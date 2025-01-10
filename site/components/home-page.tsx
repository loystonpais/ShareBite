import Image from "next/image";
import { Capacitor } from '@capacitor/core';
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Card from "./FoodCard";
import Display from "./Display";

export default function HomePage(platform: string) {

  return (
    <>
    <Navbar></Navbar>
    <Display></Display>
    </>
  );
}
