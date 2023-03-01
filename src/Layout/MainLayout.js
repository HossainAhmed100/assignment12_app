import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import NavBar from "../Components/NavBar/NavBar";
import UseHealmet from "../Hooks/UseHealmet";

function MainLayout() {
  return (
    <>
      <UseHealmet title={"Home Page"} />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
