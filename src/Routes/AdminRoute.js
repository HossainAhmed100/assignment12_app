import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LodingBar from "../Components/LodingBar/LodingBar";
import { AuthContext } from "../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

function AdminRoute({ children }) {
  const { user, loding } = useContext(AuthContext);
  const [isAdmin, adminLoding] = useAdmin(user?.email);
  if (loding || adminLoding) {
    return <LodingBar />;
  }
  if (user && isAdmin) {
    return children;
  } else {
    return <Navigate to={"/user/dashboard"} />;
  }
}

export default AdminRoute;
