import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../../components/loading/loading";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuthAdmin: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, user, validateToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const validate = async () => {
      try {
        if (token) {
          validateToken();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(true);
      }
    };
    validate();
  }, []);

  if (!loading) {
    return <Loading />;
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default RequireAuthAdmin;
