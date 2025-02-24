import React from "react";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <div className="flex flex-col items-center pt-[100px] text-5xl space-x-10 text-white">
      <p>Master Your Typing Skills</p>
      <div className="flex space-x-3">
        <p>with</p>
        <p className="text-[rgb(59,207,161)]"> SwiftKeys</p>
      </div>
      <div className="text-center text-xl mt-10 text-opacity-1">
        <p>Practice typing, challenge friends, and track improvements with</p>
        <p>real-time stats in a sleek, minimalist interface. </p>
      </div>
      <Button>Start Typing</Button>
    </div>
  );
};

export default Home;
