import { Keyboard, Swords, Zap } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between text-white text-lg w-[50%] mt-2">
        <NavLink to={"/"} className="flex text-xl">
          <Zap size={20} className="text-[rgb(59,207,161)] mr-1 mt-1" />
          <div>Swift</div>
          <div className="text-[rgb(59,207,161)]">Keys</div>
        </NavLink>
        <ul className="flex space-x-5">
          <NavLink to={"/type"} className="flex items-center">
            <Keyboard  size={18} className="mr-1" />
            <p>Type</p>
          </NavLink>
          <NavLink to={"/multiplayer"} className="flex items-center">
            <Swords size={20} className="mr-1" />
            <p>Multiplayer</p>
          </NavLink>
          <NavLink to={"/profile"} className="flex items-center">
            <p>Profile</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
