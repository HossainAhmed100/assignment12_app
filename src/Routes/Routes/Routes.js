import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import MainLayout from "../../Layout/MainLayout";
import UserLayout from "../../Layout/UserLayout";
import ADashboard from "../../Pages/Admin/ADashboard";
import AOrder from "../../Pages/Admin/AOrder";
import AProducts from "../../Pages/Admin/AProducts";
import AReviews from "../../Pages/Admin/AReviews";
import AllProducts from "../../Pages/AllProducts";
import AllReviews from "../../Pages/AllReviews";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import MyOrders from "../../Pages/MyOrders";
import NotFound from "../../Pages/NotFound";
import Purchase from "../../Pages/Purchase";
import Signup from "../../Pages/Signup";
import UserDashboard from "../../Pages/UserDashboard";
import UserProfile from "../../Pages/UserProfile";
import UserReviews from "../../Pages/UserReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "allproducts",
        element: <AllProducts />,
      },
      {
        path: "reviews",
        element: <AllReviews />,
      },
      {
        path: "purchase/:id",
        element: <Purchase />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/user/reviews",
        element: <UserReviews />,
      },
      {
        path: "/user/order",
        element: <MyOrders />,
      },
      {
        path: "/user/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <ADashboard />,
      },
      {
        path: "/admin/allproducts",
        element: <AProducts />,
      },
      {
        path: "/admin/reviews",
        element: <AReviews />,
      },
      {
        path: "/admin/alluser",
        element: <AOrder />,
      },
      {
        path: "/admin/order",
        element: <AOrder />,
      },
      {
        path: "/admin/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
