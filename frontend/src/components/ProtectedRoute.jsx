/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import { Spinner, useToast } from "@chakra-ui/react";

import axios from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast({
    id: "protected_routes_toast",
    duration: 3000,
    status: "info",
    title: "session status",
    isClosable: true,
  });

  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/auth/me");
        login(res.data);
        setLoading(false);
      } catch (err) {
        toast({
          description: "The current session has expire",
        });
        navigate("/", {
          replace: true,
        });
      }
    };

    getCurrentUser();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <Spinner mt={4} color="blue.500" size={"xl"} />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default ProtectedRoute;
