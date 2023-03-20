import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import React from "react";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import LodingBar from "../Components/LodingBar/LodingBar";

function AllReviews() {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get(`allreviews`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LodingBar />;
  }
  return (
    <div className="p-10">
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-20">
        {reviews &&
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
      </div>
    </div>
  );
}

export default AllReviews;
