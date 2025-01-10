// app/page.tsx
import FoodCard from "@/components/FoodCard";
import redis from "@/lib/redis";

export default async function HomePage() {
  // Fetch food data
  const foodData = await redis.lRange("food_data_test", 0, -1);
  const foodDataFiltered = foodData.filter((foodItem) => foodItem !== "");

  return (
    <div className="p-4">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
        {foodDataFiltered.map((foodItem, index) => {
          const parsedFoodItem = JSON.parse(foodItem);
          return (
            <FoodCard
              key={index}
              title={parsedFoodItem.title}
              prepared={parsedFoodItem.prepared}
              expiry={parsedFoodItem.expiry}
              type={parsedFoodItem.type}
              servings={parsedFoodItem.servings}
            />
          );
        })}
      </div>
    </div>
  );
}
