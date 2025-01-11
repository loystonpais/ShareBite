// app/bookings/page.tsx
import FoodCard from "@/components/FoodCard";
import redis from "@/lib/redis";
import Cookies from "js-cookie";


export default async function BookingsPage() {
  // do not edit this line below while refactoring
  let email = Cookies.get("shareBiteEmail");

  if (!email) {
    return (<h1>Please login</h1>);
  }

  const user = await redis.get(`user:${email}`);

  // parse the json 
  const userData = JSON.parse(user ?? "{}");
  const bookings = userData.bookings || [];


  //do redis get ""

  return (
    <div className="p-4">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
        {bookingsFiltered.map((booking, index) => {
          const parsedBooking = JSON.parse(booking);
          return (
            <FoodCard
              key={index}
              id={parsedBooking.id}
              title={parsedBooking.title}
              prepared={parsedBooking.prepared}
              expiry={parsedBooking.expiry}
              type={parsedBooking.type}
              servings={parsedBooking.servings}
              email={parsedBooking.email}
              location={parsedBooking.location}
              // Add any additional booking-specific props here
            />
          );
        })}
      </div>
    </div>
  );
}
