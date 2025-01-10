import React from "react";
import FoodCard from "./FoodCard";

const Display = () => {
  return (
    <div className="items-center">
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <FoodCard
            key={index}
            title={`Food Item ${index + 1}`}
            prepared="Prepared Date"
            expiry="Expiry Date"
            type="Food Type"
            servings="Number of Servings"
          />
        ))}
      </div>
    </div>
  );
};

export default Display;
