/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// AuthContext.js

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (userData) => {
    // Simulate a login process, set the user data
    setUserData(userData);
  };

  const logout = () => {
    // Simulate a logout process, clear the user data
    setUserData(null);
  };

  const value = { userData, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
