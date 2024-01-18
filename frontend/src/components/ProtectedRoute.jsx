/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
import axios from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        login(res.data.user);
      } catch (err) {
        navigate("/", {
          replace: true,
        });
      }
    };

    getCurrentUser();
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
