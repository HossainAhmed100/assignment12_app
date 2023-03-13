import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddCircle, MdClose, MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import LodingBar from "../Components/LodingBar/LodingBar";
import { AuthContext } from "../Context/AuthProvider";

function MyReviews() {
  const [isOPEN, setIsOPEN] = useState(true);
  const { serverUser, loding } = useContext(AuthContext);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //Fetch All Product
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get(`/allreviews/${serverUser.email}`);
      return res.data;
    },
  });
  //loading Animation
  if (loding || isLoading) {
    return <LodingBar />;
  }

  console.log(products);
  // Add New Product
  const onSubmit = async (data) => {
    await axios
      .post("/addNewProduct", { data })
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
      <div className="lg:p-10 p-4">
        <button
          onClick={() => setIsOPEN(!isOPEN)}
          className="btn btn-primary flex items-center justify-center"
        >
          <MdAddCircle size={25} />
          <span className="ml-2">Add New Product</span>
        </button>
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
    </div>
  );
}

export default MyReviews;
