import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import UseHealmet from "../Hooks/UseHealmet";

function MainLayout() {
  return (
    <>
      <UseHealmet title={"Home Page"} />
      <NavBar />
      <Outlet />
    </>
  );
}

export default MainLayout;
