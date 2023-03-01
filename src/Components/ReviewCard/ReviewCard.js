import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import avatar from "../../Utility/icon/logo.png";
function ReviewCard() {
  return (
    <div className="relative px-8 w-80 flex items-center justify-start flex-col rounded-2xl bg-white shadow-md">
      <div className="avatar left-8 -top-8 absolute">
        <div className="w-16 rounded-full ring ring-slate-100 ring-offset-base-100 ring-offset-2">
          <img src={avatar} alt="" />
        </div>
      </div>
      <span className="mt-8 py-4 text-gray-400">
        Vero id posuere tempus aspernatur quaerat mollis voluptatum eveniet
        porro viverra libero habitasse porro.
      </span>
      <div className="border-t w-full py-4 flex items-center justify-between border-gray-300">
        <h1>Hossain Ahmed</h1>
        <div className="text-yellow-400 flex items-center justify-center">
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
