import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserLogOutState, selectUserEmail } from "@/store/slice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Keyboard, Swords, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const getEmailInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : "?";
  };

  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(setUserLogOutState());
  };

  const navItems = [
    { path: "/type", icon: <Keyboard size={18} className="mr-1" />, label: "Type" },
    { path: "/multiplayer", icon: <Swords size={20} className="mr-1" />, label: "Multiplayer" }
  ];
  
  return (
    <motion.div 
      className="flex justify-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between text-white text-lg w-[50%] mt-2">
        <NavLink to={"/"} className="flex text-xl">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Zap size={20} className="text-[rgb(59,207,161)] mr-1 mt-1" />
            <div>Swift</div>
            <div className="text-[rgb(59,207,161)]">Keys</div>
          </motion.div>
        </NavLink>
        
        <ul className="flex space-x-10">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className="flex items-center relative"
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                  <p>{item.label}</p>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[rgb(59,207,161)]"
                      layoutId="navbar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
          
          <motion.div 
            className="flex items-center relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div 
              onClick={() => setShowDropdown(!showDropdown)} 
              className="cursor-pointer"
            >
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
            </div>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  className="absolute top-full right-2 pt-2 z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="flex flex-col gap-2 w-36 px-5 py-3 bg-[#3ACFA0] text-white rounded shadow"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <motion.p 
                      className="cursor-pointer hover:text-black"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Profile
                    </motion.p>
                    <motion.p 
                      onClick={handleLogout} 
                      className="cursor-pointer hover:text-black"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Logout
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </motion.div>
  );
};

export default Navbar;