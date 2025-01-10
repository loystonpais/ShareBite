from typing import Union

from fastapi import FastAPI

from redis import Redis
import json
from uuid import uuid4

app = FastAPI()

# Initialize Redis client
redis_client = Redis(host="localhost", port=6379, decode_responses=True)

@app.get("/add-food")
def add_food(
    username: str,
    title: str,
    prepared_date: str,
    expire_date: str,
    food_type: str,
    serving: int
):
    # Create a unique ID for the food item
    food_id = str(uuid4())

    # Prepare the food data
    food_data = {
        "username": username,
        "title": title,
        "prepared_date": prepared_date,
        "expire_date": expire_date,
        "food_type": food_type,
        "serving": serving
    }

    # Store the data in Redis (as a JSON string)
    redis_client.set(food_id, json.dumps(food_data))

    return {"message": "Food added successfully", "food_id": food_id}

@app.get("/get-food/{food_id}")
def get_food(food_id: str):
    # Retrieve the food data from Redis
    food_data = redis_client.get(food_id)

    if food_data is None:
        return {"error": "Food not found"}

    return json.loads(food_data)



import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
