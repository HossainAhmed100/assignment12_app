import React from "react";
import { Bars } from "react-loader-spinner";

export default function LodingBar() {
  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <Bars
        height="80"
        width="80"
        color="#6569ec"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
