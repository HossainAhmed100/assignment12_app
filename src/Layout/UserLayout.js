import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import LodingBar from "../Components/LodingBar/LodingBar";
import NavBar from "../Components/NavBar/NavBar";
import { AuthContext } from "../Context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
function UserLayout() {
  const { user, loding } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  if (loding) {
    return <LodingBar />;
  }

  return (
    <div>
      <NavBar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          {isAdmin ? (
            <ul className="menu space-y-2 border-r-2 p-4 w-80 md:bg-base-50 bg-base-100   text-base-content">
              <li>
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/admin/allproducts">Manage Products</NavLink>
              </li>
              <li>
                <NavLink to="/admin/order">Manage Orders</NavLink>
              </li>
              <li>
                <NavLink to="/admin/reviews">Manage Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/admin/alluser">Manage User</NavLink>
              </li>
              <li>
                <NavLink to="/admin/profile">My Account</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="menu space-y-2 border-r-2 p-4 w-80 md:bg-base-50 bg-base-100   text-base-content">
              <li>
                <NavLink to="/user/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/user/order">My Orders</NavLink>
              </li>

              <li>
                <NavLink to="/user/reviews">My Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/user/profile">My Account</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
