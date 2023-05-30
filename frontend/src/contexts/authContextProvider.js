import React, { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getCommonOptions from "../helpers/axios/getCommonOptions";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: false,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  const loadAuthUser = () => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      setIsAuthenticated(false);
      return;
    }

    axios
      .get("/api/users/auth/users/me/", getCommonOptions())
      .then((resp) => {
        setUser(resp.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  };

  const providerValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
    };
  }, [isAuthenticated, setIsAuthenticated, user, setUser]);

  useEffect(() => {
    if (!user && (isAuthenticated === null || isAuthenticated === true)) {
      loadAuthUser();
    }
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContext.propTypes = {
  children: PropTypes.node,
};
