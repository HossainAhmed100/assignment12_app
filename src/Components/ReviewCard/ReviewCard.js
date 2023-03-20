import React from "react";
import { FaStar } from "react-icons/fa";
import avatar from "../../Utility/icon/man.png";
function ReviewCard({ review, children }) {
  const { text, userName, rating } = review;
  return (
    <div className="mx-auto cursor-pointer mb-10">
      <div className="px-8 flex items-center justify-start flex-col rounded-2xl bg-white custom_box">
        <div className="w-16 mx-auto relative -mt-10">
          <img className="-mt-1" src={avatar} alt="Cookie Icon SVG" />
        </div>
        <span className="my-4 line-clamp-3 text-gray-400">{text && text}</span>
        <div className="border-t w-full py-4 flex items-center justify-between border-gray-300">
          <h1>{userName && userName}</h1>
          <div className="flex items-center justify-center">
            {[...Array(5)].map((start, i) => {
              const ratingValue = i + 1;
              return (
                <FaStar
                  key={i}
                  className="cursor-pointer"
                  color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                />
              );
            })}
          </div>
        </div>
        {children && children}
      </div>
    </div>
  );
}

export default ReviewCard;
