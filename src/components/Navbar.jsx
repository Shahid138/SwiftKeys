import { Rabbit } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between text-white text-lg w-[50%] mt-2">
        <NavLink to={"/"} className="flex text-xl">
          <Rabbit className="text-[rgb(59,207,161)] mr-1" size="24" />
          <div>Swift</div>
          <div className="text-[rgb(59,207,161)]">Keys</div>
        </NavLink>
        <ul className="flex space-x-5">
          <NavLink to={"/type"}>
            <p>Type</p>
          </NavLink>
          <NavLink to={"/multiplayer"}>
            <p>Multiplayer</p>
          </NavLink>
          <NavLink to={"/profile"}>
            <p>Profile</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
