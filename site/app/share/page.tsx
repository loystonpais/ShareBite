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


export default function CardWithForm() {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [prepared, setPrepare] = useState<Date>();
    const [expiry, setExpiry] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);
    const [servings, setServings] = useState(1);
  
    const handleShareClick = async () => {
      try {
        setIsLoading(true);
        
        const foodData = {
          title,
          type,
          prepared: prepared?.toISOString(),
          expiry: expiry?.toISOString(),
          servings: servings
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
  
        // Handle success (e.g., show success message, reset form, redirect)
        console.log('Food item saved successfully:', result);
        
        // Optional: Reset form
        setTitle("");
        setType("");
        setPrepare(undefined);
        setExpiry(undefined);
        setServings(1);
  
      } catch (error) {
        console.error('Error saving food item:', error);
        // Handle error (e.g., show error message to user)
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