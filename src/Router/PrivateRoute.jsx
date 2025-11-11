import React, { use } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useLocation } from "react-router";
import { AuthContex } from "../AuthContex/AuthContex";
import { Loader } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContex);
  const location = useLocation();
  // Optionally show a loading state while checking auth
  if (loading) {
    return (
      // <div className="flex justify-center items-center min-h-screen">
      //   <p>Loading...</p>
      // </div>
      <Loader></Loader>
    );
  }

  // If user is not logged in, redirect to login
  if (user) {
    return children;
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //`toy/${data.toyId}`
  // If logged in, render the child routes
  return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRoute;
