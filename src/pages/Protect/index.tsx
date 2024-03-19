import { validateToken } from "@/services/user";
import userStore from "@/store/userStore";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectProps {
  children: ReactNode;
  redirectTo: string;
}

function ProtectRoutes({ children, redirectTo }: ProtectProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = userStore.getState().token;

      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await validateToken(token);

        if (response.data.isAuth === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default ProtectRoutes;
