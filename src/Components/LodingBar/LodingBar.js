import React from "react";
import { Bars } from "react-loader-spinner";

export default function LodingBar() {
  return (
    <Bars
      height="80"
      width="80"
      color="#6569ec"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
