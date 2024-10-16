import React from "react";
// Dependency
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      {/* To Render All of the Children's */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
