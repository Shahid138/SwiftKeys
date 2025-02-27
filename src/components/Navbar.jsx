import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserLogOutState } from "@/store/slice/userSlice";
import { selectUserEmail } from "@/store/slice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Keyboard, Swords, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const dispatch = useAppDispatch();
  
  const getEmailInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  const handleLogout = () => {
    dispatch(setUserLogOutState());
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
          <NavLink className="flex items-center relative group">
            <Avatar className="w-8">
              <AvatarImage
                className="rounded-full w-[25px]"
                src="your-image-url-here"
                alt="User avatar"
              />
              <AvatarFallback className="bg-gray-600 rounded-full w-[25px] h-[25px] flex items-center justify-center text-sm">
                {getEmailInitial(userEmail)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden group-hover:block absolute top-full right-2 pt-2 z-10">
              <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-[#3ACFA0] text-white rounded shadow">
                <p className="cursor-pointer hover:text-black">Profile</p>
                <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;