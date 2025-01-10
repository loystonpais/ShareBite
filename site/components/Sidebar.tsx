import React from "react";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-64 w-full  bg-gray-800 text-white flex flex-row lg:flex-col items-center lg:items-start p-4 space-x-4 lg:space-y-4 fixed lg:static bottom-0 lg:h-screen justify-center lg:justify-start">
          <Button className="text-center lg:text-left">Icon 1</Button>
          <Button className="text-center lg:text-left">Icon 2</Button>
          <Button className="text-center lg:text-left">Icon 3</Button>
          <Button className="text-center lg:text-left">Icon 4</Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
