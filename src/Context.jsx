import React, { createContext, useContext, useEffect } from "react";
// Custom Hook
import useFetchData from "./Hooks/useFetchData";
// DB
import { getCurrentUser } from "./db/apiAuth";

const urlContext = createContext();

const Context = ({ children }) => {
  const {
    data: user,
    loading,
    handleMakeGetCall: fetchUser,
  } = useFetchData(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <urlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </urlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(urlContext);
};

export default Context;
