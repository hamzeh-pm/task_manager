import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/authContextProvider";

export default function RequireNotAuth() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <div>loading....</div>;
  }

  if (isAuthenticated === true) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
