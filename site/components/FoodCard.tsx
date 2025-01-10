"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import { formatDate } from "@/lib/date";
import Image from "next/image";
import redis from "@/lib/redis";

export default function FoodCard({
  id,
  title,
  prepared,
  expiry,
  type,
  servings,
  email,
}: {
  id: number,
  title: string;
  prepared: string;
  expiry: string;
  type: string;
  servings: string;
  email: string;
}) {

  const handleBooking = async () => {
    try {
        const response = await fetch('/api/food', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }

        // Handle successful deletion (e.g., refresh the page or update UI)
        window.location.reload(); // Or use a more sophisticated state update method
    } catch (error) {
        console.error('Error in handleBooking:', error);
    }
};


  return (
    <>
      <Card className="w-[350px] bg-white p-4 text-black shadow-md rounded-lg ">
        {/*<CardHeader className="w-full h-[300px] bg-slate-500 rounded mb-4 flex items-center justify-center">*/}
          {/*<p className="text-white font-bold">Image Placeholder</p>*/}
          <Image
            src="/sample1.jpg"
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded mb-4"
          />
        {/*</CardHeader>*/}
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm mb-1">Id: {id}</p>
          <p className="text-sm mb-1">Prepared on: {formatDate(prepared)}</p>
          <p className="text-sm mb-1">Expiring on: {formatDate(expiry)}</p>
          <p className="text-sm mb-1">Type: {type}</p>
          <p className="text-sm mb-1">Servings: {servings}</p>
          <p className="text-sm mb-1">Contact Email: {email}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-4">
          <Button  onClick={handleBooking} className="bg-red-900 text-white px-4 py-2 rounded hover:drop-shadow-lg hover:bg-red-600">
            Book Food
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
