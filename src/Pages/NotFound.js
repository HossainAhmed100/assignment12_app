import React from "react";
import { Link } from "react-router-dom";
import UseHealmet from "../Hooks/UseHealmet";

function NotFound() {
  return (
    <div>
      <UseHealmet title={"404 - Page Not Found"} />
      <div className="w-full h-[500px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl text-indigo-500 font-bold">404</h1>
          <h1 className="text-2xl text-indigo-500 font-bold">
            Page Not Found.
          </h1>
          <Link to="/" className="link">
            Go to Home Page{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
