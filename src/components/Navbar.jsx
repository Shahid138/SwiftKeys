
import { useAppSelector } from "@/store/hooks";
import { selectUserEmail } from "@/store/slice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Keyboard, Swords, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
   const userEmail = useAppSelector(selectUserEmail);
  
  const getEmailInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between text-white text-lg w-[50%] mt-2">
        <NavLink to={"/"} className="flex text-xl">
          <Zap size={20} className="text-[rgb(59,207,161)] mr-1 mt-1" />
          <div>Swift</div>
          <div className="text-[rgb(59,207,161)]">Keys</div>
        </NavLink>
        <ul className="flex space-x-10">
          <NavLink to={"/type"} className="flex items-center">
            <Keyboard size={18} className="mr-1" />
            <p>Type</p>
          </NavLink>
          <NavLink to={"/multiplayer"} className="flex items-center">
            <Swords size={20} className="mr-1" />
            <p>Multiplayer</p>
          </NavLink>
          <NavLink to={"/profile"} className="flex items-center">
            <Avatar className="w-8">
              <AvatarImage 
                className="rounded-full w-[25px]"
                src="your-image-url-here"
                alt="User avatar"
              />
              <AvatarFallback className="bg-gray-600 rounded-full w-[25px] h-[25px] flex items-center justify-center text-sm">
                { getEmailInitial(userEmail) }
              </AvatarFallback>
            </Avatar>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;