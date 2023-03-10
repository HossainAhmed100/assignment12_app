import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import avatar from "../Utility/icon/logo.png";
import {
  HiMail,
  HiPencil,
  HiOutlineX,
  HiAtSymbol,
  HiOutlinePhone,
} from "react-icons/hi";
import { useForm } from "react-hook-form";

function UserProfile() {
  const [isUpdate, setIsUpdate] = useState(true);
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "d",
      phone: "0",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          {isUpdate ? (
            <div className="card w-96 bg-base-100 custom_box">
              <figure className="px-10 pt-10">
                <img src={avatar} alt="Shoes" className="rounded-xl w-24" />
              </figure>
              <div className="card-body items-start">
                <h2 className="card-title">{user && user?.name}</h2>
                <h2 className="card-title">
                  <HiAtSymbol /> {user && user?.role}
                </h2>
                <h2 className="card-title">
                  <HiMail /> {user && user?.email}
                </h2>
                <h2 className="card-title">
                  <HiOutlinePhone /> {user && user?.phone}
                </h2>
                <h2 className="card-title">{user && user?.address}</h2>
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
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                </form>
                <div className="card-actions w-full mt-4">
                  <button type="submit" className="btn btn-primary">
                    <HiOutlineX className="mr-1" size={20} />
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <HiPencil className="mr-1" size={20} />
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
