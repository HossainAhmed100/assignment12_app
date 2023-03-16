import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import LodingBar from "../Components/LodingBar/LodingBar";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import { AuthContext } from "../Context/AuthProvider";
import UseHealmet from "../Hooks/UseHealmet";

function MyReviews() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch All Product
  const url = `/allreviews/${user?.email}`;
  const { data: reviews = [] } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get(url);
      setLoading(false);
      return res.data;
    },
  });

  //loading Animation
  if (loading) {
    return <LodingBar />;
  }
  return (
    <div>
      <UseHealmet title={"All User Reviews"} />
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review._id} />
        ))}
      </div>
    </div>
  );
}

export default MyReviews;
