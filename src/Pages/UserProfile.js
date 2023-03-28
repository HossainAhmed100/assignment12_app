import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import avatar from "../Utility/icon/man.png";
import { HiPencil, HiOutlineX } from "react-icons/hi";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { useQuery } from "@tanstack/react-query";
import LodingBar from "../Components/LodingBar/LodingBar";
import { toast } from "react-toastify";

function UserProfile() {
  const [isUpdate, setIsUpdate] = useState(true);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const { user, loding } = useContext(AuthContext);
  // Load User information by email
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["signleUser", user],
    queryFn: async () => {
      const res = await axios.get(`signleUser/${user?.email}`, config);
      return res.data;
    },
  });

  // User form action
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loding) {
    return <LodingBar />;
  }

  // Update User Profile
  const onSubmit = async (data) => {
    const url = `updateUser/${user?.email}`;
    const names = data.name;
    const email = user?.email;
    const role = userData?.role;
    const phones = data.phone;
    const addresss = data.address;
    const userInfo = { names, phones, addresss, email, role };
    await axios
      .put(url, { userInfo }, config)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();
          toast.success("Profile Updated!");
          setIsUpdate(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          {isUpdate ? (
            <div className="card w-96 bg-base-100 custom_box">
              <figure className="px-10 pt-10">
                <img src={avatar} alt="Shoes" className="rounded-xl w-24" />
              </figure>
              <div className="card-body items-start">
                <h2>
                  <span>Name : </span> {userData?.name}
                </h2>
                <h2>
                  <span>Role : </span> {userData?.role}
                </h2>
                <h2>
                  <span>Email : </span> {userData?.email}
                </h2>
                <h2>
                  <span>Phone : </span> {userData?.phone}
                </h2>
                <h2>
                  <span>Address : </span> {userData?.address}
                </h2>
                <div className="card-actions w-full mt-4">
                  <button
                    onClick={() => setIsUpdate(!isUpdate)}
                    className="btn w-full btn-primary"
                  >
                    <HiPencil className="mr-1" size={20} />
                    Update
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card w-96 bg-base-100 custom_box">
              <figure className="px-10 pt-10">
                <img src={avatar} alt="Shoes" className="rounded-xl w-24" />
              </figure>
              <div className="card-body items-start">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-3"
                >
                  <div className="form-control">
                    <label>Full Name *</label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Type Your Full NAme"
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Name is required
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label>Phone *</label>
                    <input
                      {...register("phone", { required: true })}
                      type="number"
                      placeholder="Type Your phone Number"
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.phone?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Phone is required
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label>Address *</label>
                    <input
                      {...register("address", { required: true })}
                      type="text"
                      placeholder="Type Your address"
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.address?.type === "required" && (
                      <p role="alert" className="text-red-500">
                        Address is required
                      </p>
                    )}
                  </div>
                  <button type="submit" className="btn w-full btn-primary">
                    <HiPencil className="mr-1" size={20} />
                    Confirm
                  </button>
                </form>
                <button
                  onClick={() => setIsUpdate(!isUpdate)}
                  className="btn w-full btn-primary"
                >
                  <HiOutlineX className="mr-1" size={20} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
