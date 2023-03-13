import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddCircle, MdClose, MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import LodingBar from "../Components/LodingBar/LodingBar";
import { AuthContext } from "../Context/AuthProvider";
import UseHealmet from "../Hooks/UseHealmet";
import ReviewCard from "../Components/ReviewCard/ReviewCard";

function UserReviews() {
  const [isOPEN, setIsOPEN] = useState(false);
  const { serverUser } = useContext(AuthContext);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Fetch All Product
  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get(`allreviews/${serverUser?.email}`);
      return res.data;
    },
  });

  //loading Animation
  if (isLoading) {
    return <LodingBar />;
  }

  // Add New Product
  const onSubmit = async (data) => {
    const text = data.reviews;
    const email = serverUser.email;
    const userId = serverUser._id;
    const reviews = { text, email, userId };
    const url = `addnewreviews/${serverUser?.email}`;
    await axios
      .post(url, { reviews })
      .then((res) => {
        if (res.data.acknowledged) {
          reset();
          refetch();
          toast.success("Product Added Succeed!");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <UseHealmet title={"My Reviews"} />
      <div className="lg:p-10 p-4">
        {!isOPEN && (
          <button
            onClick={() => setIsOPEN(!isOPEN)}
            className="btn btn-primary flex items-center justify-center"
          >
            <MdAddCircle size={25} />
            <span className="ml-2">Add New Product</span>
          </button>
        )}
        {isOPEN && (
          <div className="bg-white p-8 custom_box w-96">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-center">Add New item</h1>
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
                <label>Product Description *</label>
                <textarea
                  {...register("prdescription", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Write Product Description"
                ></textarea>
                {errors.prdescription?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Product Description is required
                  </p>
                )}
              </div>

              <button
                className="btn btn-primary gap-2 flex items-center justify-center  w-full max-w-xs"
                type="submit"
              >
                <MdOutlineFileUpload size={23} />
                <span>UPLOAD</span>
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2">
        {reviews && reviews.map((review) => <ReviewCard key={review._id} />)}
      </div>
    </div>
  );
}

export default UserReviews;
