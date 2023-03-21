import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
function UserLayout() {
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
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
