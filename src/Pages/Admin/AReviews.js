import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import UseHealmet from "../../Hooks/UseHealmet";
import LodingBar from "../../Components/LodingBar/LodingBar";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

function AReviews() {
  // Fetch All reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get("allreviews");
      return res.data;
    },
  });

  if (isLoading) {
    return <LodingBar />;
  }
  return (
    <div className="lg:py-20 py-10 px-10">
      <UseHealmet title={"All User Reviews"} />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review}>
            <div className="border-t w-full py-4 border-gray-300">
              <button className="btn btn-primary">DELETE</button>
            </div>
          </ReviewCard>
        ))}
      </div>
    </div>
  );
}

export default AReviews;
