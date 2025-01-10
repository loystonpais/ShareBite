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

export default function FoodCard({
  title,
  prepared,
  expiry,
  type,
  servings,
}: {
  title: string;
  prepared: string;
  expiry: string;
  type: string;
  servings: string;
}) {
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
          <p className="text-sm mb-1">Prepared on: {formatDate(prepared)}</p>
          <p className="text-sm mb-1">Expiring on: {formatDate(expiry)}</p>
          <p className="text-sm mb-1">Type: {type}</p>
          <p className="text-sm mb-1">Servings: {servings}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-4">
          <Button className="bg-red-900 text-white px-4 py-2 rounded hover:drop-shadow-lg hover:bg-red-600">
            Book Food
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
