/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// AuthContext.js

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Simulate a login process, set the user data
    setUser(userData);
  };

  const logout = () => {
    // Simulate a logout process, clear the user data
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
