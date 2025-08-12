// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/cookie-utils";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
    };
    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9F0]">
        <p>Loading...</p>
      </div>
    );
  }

  // Render child routes if authenticated, otherwise redirect to /signin
  return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;