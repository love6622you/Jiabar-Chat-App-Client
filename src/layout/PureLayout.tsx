import React from "react";
import { Outlet } from "react-router-dom";

const PureLayout = () => {
  return (
    <div className="grid h-full w-full place-content-center">
      <Outlet />
    </div>
  );
};

export default PureLayout;
