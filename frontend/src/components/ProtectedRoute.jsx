import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.user !== null) {
      navigate("/", {
        replace: true,
      });
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
