import requests

# Define the base URL of your FastAPI application
url = "http://127.0.0.1:8000/add-food"

# Define the query parameters
params = {
    "username": "john_doe",
    "title": "Pizza",
    "prepared_date": "2025-01-10",
    "expire_date": "2025-01-20",
    "food_type": "Italian",
    "serving": 4
}

# Send the GET request with the parameters
response = requests.get(url, params=params)

# Print the response from the server
print(response.json())  # If the response is JSON formatted
