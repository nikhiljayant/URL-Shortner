import React from "react";
// Dependency
import { Outlet } from "react-router-dom";
// Component
import Header from "../Common/Header";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />

        {/* To Render All of the Children's */}
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with ❤️ by Nikhil Jayant.
      </div>
    </div>
  );
};

export default AppLayout;
