import React from 'react'
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from './ui/card'
  import { Button } from './ui/button'

const FoodCard= () => {
  return (
    <>
        <Card className="w-[350px] bg-white p-4 text-black shadow-md rounded-lg">
          <CardHeader className="w-full h-[300px] bg-slate-500 rounded mb-4 flex items-center justify-center">
            <p className="text-white font-bold">Image Placeholder</p>
          </CardHeader>
          <CardContent>
            <CardTitle>Food name</CardTitle>
            <p className="text-sm mb-1">Prepared: </p>
            <p className="text-sm mb-1">Expiry:</p>
            <p className="text-sm mb-1">Type: </p>
            <p className="text-sm mb-1">Servings: </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-4">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:drop-shadow-lg hover:bg-blue-400">
              Book Food
            </Button>
          </CardFooter>
      </Card>
    </>
    
  )
}

export default FoodCard
