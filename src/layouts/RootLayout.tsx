import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = (): ReactElement => {
  return (
    <div className="bg-[rgb(21,21,20)] font-atkinson h-screen m-0 p-0">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;



