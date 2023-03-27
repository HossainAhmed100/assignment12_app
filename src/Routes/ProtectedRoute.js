import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LodingBar from "../Components/LodingBar/LodingBar";
import { AuthContext } from "../Context/AuthProvider";

function ProtectedRoute({ children }) {
  const { user, loding } = useContext(AuthContext);
  if (loding) {
    return <LodingBar />;
  }
  if (user && user.uid) {
    return children;
  }
  return <Navigate to={"/login"} />;
}

export default ProtectedRoute;
