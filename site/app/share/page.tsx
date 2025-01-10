"use client";
import { useState } from "react";
import { format, set } from "date-fns";
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
import Cookies from "js-cookie";

import { toast } from "@/hooks/use-toast";


export default function CardWithForm() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [prepared, setPrepare] = useState<Date>();
    const [expiry, setExpiry] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);
    const [servings, setServings] = useState(1);

    const shareBitesEmail = Cookies.get('shareBiteEmail');
    const shareBitesPaswd = Cookies.get('shareBitePswd');
  
    const handleShareClick = async () => {
        try {
          setIsLoading(true);
      
          // First check for login
          if (!shareBitesEmail && !shareBitesPaswd) {
            toast({
              title: "Error",
              description: "Please login first",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          // Validate all required fields
          if (!title.trim()) {
            toast({
              title: "Missing Information",
              description: "Please enter a title for your food item",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          if (!type) {
            toast({
              title: "Missing Information",
              description: "Please select a food type",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          if (!prepared) {
            toast({
              title: "Missing Information",
              description: "Please select the preparation date",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          if (!expiry) {
            toast({
              title: "Missing Information",
              description: "Please select the expiry date",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          // Validate that expiry date is after prepared date
          if (expiry < prepared) {
            toast({
              title: "Invalid Dates",
              description: "Expiry date cannot be before preparation date",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          // Validate servings
          if (servings < 1) {
            toast({
              title: "Invalid Servings",
              description: "Number of servings must be at least 1",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
      
          const id = Math.floor(Math.random() * 100000);
          
          const foodData = {
            id,
            title,
            type,
            prepared: prepared.toISOString(),
            expiry: expiry.toISOString(),
            servings: servings,
            email: shareBitesEmail,
          };
      
          const response = await fetch('/api/food', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodData),
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            throw new Error(result.error || 'Something went wrong');
          }
      
          // Show success toast
          toast({
            title: "Success",
            description: "Food item shared successfully!",
            variant: "default",
          });
      
          // Reset form
          setTitle("");
          setType("");
          setPrepare(new Date());
          setExpiry(new Date());
          setServings(1);
      
        } catch (error) {
          console.error('Error saving food item:', error);
          toast({
            title: "Error",
            description: "Failed to share food item. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
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
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="preparedOn">Prepared On</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !prepared && "text-muted-foreground"
                      )}
                    >
                      {prepared ? format(prepared, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={prepared}
                      onSelect={setPrepare}
                      className="border rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expiringOn">Expiring On</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !expiry && "text-muted-foreground"
                      )}
                    >
                      {expiry ? format(expiry, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expiry}
                      onSelect={setExpiry}
                      className="border rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="servings">Number of Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  placeholder="Enter number of servings"
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
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

              {/* Removed Image Upload Section completely */}
            </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleShareClick}
              disabled={isLoading}
            >
              {isLoading ? "Sharing..." : "SHARE"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }