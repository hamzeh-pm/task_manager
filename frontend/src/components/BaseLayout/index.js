import React from "react";
import AppHeaders from "./appHeaders";
import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <div>
      <AppHeaders />
      <Outlet />
    </div>
  );
}
