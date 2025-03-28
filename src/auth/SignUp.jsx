import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "@/firebase/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const createUser = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="block text-gray-400 text-sm">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Mail className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            placeholder="signup@gmail.com"
            className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 border-0 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-400 text-sm">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Lock className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="w-full pl-10 pr-4 py-2 rounded bg-gray-800 border-0 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <button
        onClick={createUser}
        type="submit"
        className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded flex items-center justify-center space-x-2 group transition-colors"
      >
        <span>Sign Up</span>
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>

      <button
        onClick={signUpWithGoogle}
        type="button"
        className="w-full mt-4 py-2 px-4 bg-white hover:bg-gray-100 text-gray-800 rounded flex items-center justify-center space-x-2"
      >
        <img src="../src/assets/google.svg" alt="Google" className="w-5 h-5" />
        <span>Continue with Google</span>
      </button>
    </form>
  );
};

export default SignUp;
