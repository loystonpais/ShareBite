"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { format } from "date-fns";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export default function CardWithForm() {
  const [date, setDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [imageSource, setImageSource] = useState<string | null>(null);

  const takePicture = async () => {
    try {
      if (!(Capacitor.getPlatform() === 'web')) {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera, // or CameraSource.Photos for gallery
        });

        //setImageSource(image.dataUrl);
      } else {
        // Handle web case using standard file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImageSource(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Share</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* ... other form fields */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter title" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="preparedOn">Prepared On</Label>
                {/* ... Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expiringOn">Expiring On</Label>
                {/* ... Date Picker */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      className="border rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Type</Label>
                {/* ... Select */}
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="veg">Veg</SelectItem>
                    <SelectItem value="egg">Egg</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Capacitor Camera */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image</Label>
                <Button variant="outline" onClick={takePicture}>Take Picture</Button>
                {imageSource && (
                  <div className="mt-2">
                    <img src={imageSource} alt="Captured Image" className="max-h-40 rounded-md" />
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>SHARE</Button>
        </CardFooter>
      </Card>
    </div>
  );
}