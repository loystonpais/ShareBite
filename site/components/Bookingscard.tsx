import React from 'react';
import { Button } from './ui/button';

const Bookingscard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6 m-4">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <h1 className="text-lg font-semibold text-gray-800">Title:</h1>
        <p className="text-sm text-gray-600">Expire date:</p>
        <p className="text-sm text-gray-600">Location:</p>
      </div>
      <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Picked
      </Button>
    </div>
  </div>
  );
};

export default Bookingscard;