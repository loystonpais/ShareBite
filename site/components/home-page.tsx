import Image from "next/image";
import { Capacitor } from '@capacitor/core';
import { Button } from "@/components/ui/button";

export default function HomePage(platform: string) {
  return (
    <>
    <h1>{platform}</h1>
    <Button>Click</Button>
    </>
  );
}
