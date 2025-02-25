import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="flex flex-col items-center pt-[100px] text-5xl space-x-10 text-white">
      <p className="font-bold">Master Your Typing Skills</p>
      <div className="flex mt-4 space-x-3">
        <p className="font-bold">with</p>
        <p className="text-[rgb(59,207,161)] font-bold"> SwiftKeys</p>
      </div>
      <div className="text-center text-gray-400 text-lg mt-5 text-">
        <p>Practice typing, challenge friends, and track improvements with</p>
        <p>real-time stats in a sleek, minimalist interface. </p>
      </div>
      <Link to={"/type"}>
      <button className=" py-2 px-4  mt-[50px] bg-emerald-500 hover:bg-emerald-600 text-sm text-white rounded flex items-center justify-center space-x-2 group transition-colors">
        <span>Start Typing Now</span>
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </button>
      </Link>
      <div className="pt-[50px] text-white text-4xl font-bold">
        <p>Why Choose SwiftKeys?</p>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
