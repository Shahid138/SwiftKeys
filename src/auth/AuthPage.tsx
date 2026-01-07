import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="h-[650px] flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-[rgb(21,21,20)] shadow-[0px_10px_1px_rgb(59,207,161),_0_10px_20px_rgb(59,207,161)]">
        <h1 className="text-2xl font-atkinson text-white text-center mb-2">
          Welcome to
        </h1>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-atkinson text-white text-center mb-2">
            Swift
          </h1>
          <h1 className="text-2xl font-atkinson text-[rgb(59,207,161)] text-center mb-2">
            Keys
          </h1>
        </div>
        <p className="text-gray-500 text-center text-sm mb-6">
          Sign in to your account or create a new one
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => setActiveTab("signin")}
            className={`py-2 text-center rounded ${
              activeTab === "signin"
                ? "bg-[rgb(59,207,161)] text-white"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`py-2 text-center rounded ${
              activeTab === "signup"
                ? "bg-[rgb(59,207,161)] text-white"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "signin" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default AuthPage;


