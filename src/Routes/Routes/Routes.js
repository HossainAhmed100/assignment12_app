import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import AllProducts from "../../Pages/AllProducts";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import NotFound from "../../Pages/NotFound";
import Signup from "../../Pages/Signup";
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
        element: <UserReviews />,
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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
