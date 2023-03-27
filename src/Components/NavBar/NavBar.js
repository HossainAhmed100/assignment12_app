import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import logo from "../../Utility/icon/logo.png";
import avatar from "../../Utility/icon/man.png";

function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const navigate = useNavigate();
  const handleUserLogOut = () => {
    logoutUser().then(() => {
      navigate("/login");
      toast.success("Logout Successfullay!");
    });
  };

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/allproducts">All Products</Link>
                </li>
                <li>
                  <Link to="/reviews">Reviews</Link>
                </li>
              </ul>
            </div>
            <a href="/">
              <div className="btn btn-ghost flex items-center justify-center">
                <img src={logo} className="w-6 h-6" alt="" />
                <h3 className="text-base ml-1 mt-1">Materia</h3>
              </div>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-1 px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allproducts">All Products</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {user?.uid ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 ring rounded-full">
                    <img src={avatar} alt="" />
                  </div>
                </label>
                {isAdmin ? (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact space-y-1 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/admin/profile">Account</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleUserLogOut}
                        className="text-red-500 font-bol"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul
                    tabIndex={0}
                    className="menu menu-compact space-y-1 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/user/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/user/profile">Account</Link>
                    </li>
                    <li>
                      <Link to="/user/order">My Orders</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleUserLogOut}
                        className="text-red-500 font-bol"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary btn-sm mg:btn">
                  Signup
                </Link>
                <Link to="/login" className="btn ml-2 btn-sm mg:btn">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
