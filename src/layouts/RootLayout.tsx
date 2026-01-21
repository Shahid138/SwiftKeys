import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = (): ReactElement => {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(21,21,20)] font-atkinson text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-8xl flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
