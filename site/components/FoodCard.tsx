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

import { useToast } from "@/hooks/use-toast";

import Cookies from "js-cookie";

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

  const { toast } = useToast();

  const handleBooking = async (id: number) => {
    const userEmail = Cookies.get("shareBiteEmail");
    
    if (!userEmail) {
        toast({
            title: "Authentication Required",
            description: "Please login first to book food items.",
            variant: "destructive",
        });
        return;
    }

    // First verify if user exists in Redis
    try {
        const verifyResponse = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
        });

        const verifyData = await verifyResponse.json();
        
        if (!verifyData.success) {
            toast({
                title: "Authentication Failed",
                description: "Please login again to continue.",
                variant: "destructive",
            });
            // Optionally clear the invalid cookie
            Cookies.remove("shareBiteEmail");
            return;
        }

        // If user is verified, proceed with booking
        const response = await fetch('/api/food', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                userEmail
            }),
        });

        const data = await response.json();
        if (data.success) {
            toast({
                title: "Success",
                description: "Food item booked successfully!",
            });
            // Add any additional success handling here
        } else {
            toast({
                title: "Error",
                description: data.error || "Failed to book food item",
                variant: "destructive",
            });
        }
    } catch (error) {
        toast({
            title: "Error",
            description: `An error occurred while booking the food item ${error}`,
            variant: "destructive",
        });
        console.error('Error booking food:', error);
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
          <Button  onClick={() => handleBooking(id)} className="bg-red-900 text-white px-4 py-2 rounded hover:drop-shadow-lg hover:bg-red-600">
            Book Food
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
