import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddCircle, MdClose } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { toast } from "react-toastify";
import LodingBar from "../Components/LodingBar/LodingBar";
import { AuthContext } from "../Context/AuthProvider";
import UseHealmet from "../Hooks/UseHealmet";
import ReviewCard from "../Components/ReviewCard/ReviewCard";
import { FaStar } from "react-icons/fa";

function UserReviews() {
  const [isOPEN, setIsOPEN] = useState(false);
  const [rating, setRating] = useState(null);
  const [starHover, steStarHover] = useState(null);
  const { user } = useContext(AuthContext);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Load User information by email
  const { data: userData = [] } = useQuery({
    queryKey: ["signleUser"],
    queryFn: async () => {
      const res = await axios.get(`signleUser/${user?.email}`);
      return res.data;
    },
  });

  // Fetch All Product
  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get(`allreviews/${user?.email}`);
      return res.data;
    },
  });

  //loading Animation
  if (isLoading) {
    return <LodingBar />;
  }

  const fromClose = () => {
    setIsOPEN(!isOPEN);
    setRating(null);
  };

  // Add New Product
  const onSubmit = async (data) => {
    const text = data.reviews;
    const email = userData?.email;
    const userId = userData?._id;
    const userName = userData?.name;
    const reviews = { userName, text, rating, email, userId };
    const url = `addnewreviews/${user?.email}`;
    await axios
      .post(url, { reviews })
      .then((res) => {
        if (res.data.acknowledged) {
          reset();
          refetch();
          toast.success("Reviews Added Succeed!");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="lg:py-10 p-8 lg:px-10 px-8">
      <UseHealmet title={"My Reviews"} />
      <div>
        {!isOPEN && (
          <button
            onClick={() => fromClose()}
            className="btn btn-primary flex items-center justify-center"
          >
            <MdAddCircle size={25} />
            <span className="ml-2">Add New Reviews</span>
          </button>
        )}
        {isOPEN && (
          <div className="bg-white p-8 custom_box w-96">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-center">Add New Reviews</h1>
              <button
                onClick={() => setIsOPEN(!isOPEN)}
                className="btn btn-ghost text-end"
              >
                <MdClose size={25} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 w-full"
            >
              <div className="form-control">
                <label>Write Reviews *</label>
                <textarea
                  {...register("reviews", {
                    required: { value: true, message: "Plz Write Something" },
                    minLength: {
                      value: 200,
                      message: "Write Minimun 200 Character",
                    },
                  })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Write..."
                ></textarea>
                {errors.reviews && (
                  <p role="alert" className="text-red-500">
                    {errors.reviews.message}
                  </p>
                )}
              </div>
              <div className="form-control py-4">
                <label>Rating*</label>
                <div className="flex items-center justify-start">
                  {[...Array(5)].map((start, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={ratingValue}>
                        <input
                          onClick={() => setRating(ratingValue)}
                          className="hidden"
                          type="radio"
                          name="rating"
                          defaultValue={ratingValue}
                        />
                        <FaStar
                          onMouseEnter={() => steStarHover(ratingValue)}
                          onMouseLeave={() => steStarHover(null)}
                          className="cursor-pointer"
                          color={
                            ratingValue <= (starHover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          size={40}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                className="btn btn-primary gap-2 flex items-center justify-center  w-full max-w-xs"
                type="submit"
              >
                <VscFeedback size={23} />
                <span>SUBMIT</span>
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-20">
        {reviews &&
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
      </div>
    </div>
  );
}

export default UserReviews;
