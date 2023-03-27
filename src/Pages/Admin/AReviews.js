import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import UseHealmet from "../../Hooks/UseHealmet";
import LodingBar from "../../Components/LodingBar/LodingBar";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import { RiMessage3Fill } from "react-icons/ri";
import { toast } from "react-toastify";

function AReviews() {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  // Fetch All reviews
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get("allreviews", config);
      return res.data;
    },
  });

  if (isLoading) {
    return <LodingBar />;
  }

  const deleteReviews = async (id) => {
    await axios
      .delete(`allreviews/${id}`, config)
      .then((res) => {
        if (res.data.deletedCount === 1) {
          toast.success("1 Review Deleted!");
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="lg:py-10 py-10 px-10">
      <UseHealmet title={"All User Reviews"} />
      <div className=" hover:border-blue-400 duration-300 mb-20  0  rounded-sm cursor-pointer p-8 custom_box">
        <div className="flex items-center gap-4">
          <RiMessage3Fill size={40} />

          <h3 className="text-3xl font-bold sm:text-4xl">{reviews.length}</h3>
        </div>

        <p className="mt-4 font-medium text-gray-500">Total Reviews</p>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review}>
            <div className="border-t w-full py-4 border-gray-300">
              <button
                onClick={() => deleteReviews(review._id)}
                className="btn btn-primary"
              >
                DELETE
              </button>
            </div>
          </ReviewCard>
        ))}
      </div>
    </div>
  );
}

export default AReviews;
