import Image from "next/image";
import { Capacitor } from '@capacitor/core';
import { Button } from "@/components/ui/button";
import HomePage from "@/components/home-page";

export default function RenderStart() {
  const platform: string = Capacitor.getPlatform();
  return HomePage(platform);
}
