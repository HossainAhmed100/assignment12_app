import React, { useState } from "react";
import {
  AiOutlineGoogle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import UseHealmet from "../Hooks/UseHealmet";
function Signup() {
  const [isOPEN, setIsOPEN] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <UseHealmet title={"Signup Page"} />
      <div className="container mx-auto">
        <div className="lg:p-20 p-4 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 bg-white p-8 custom_box w-96"
          >
            <h1 className="text-2xl font-bold text-center">Signup now</h1>
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
              <label>Email *</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Type Your Email"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Email is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label>Password *</label>
              <label htmlFor="passwodr" className="relative block">
                {isOPEN ? (
                  <AiOutlineEye
                    onClick={() => setIsOPEN(!isOPEN)}
                    className="w-6 h-6 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setIsOPEN(!isOPEN)}
                    className="w-6 h-6 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3"
                  />
                )}

                <input
                  {...register("password", { required: true })}
                  type={isOPEN ? "text" : "password"}
                  placeholder="Type Your Password"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              {errors.password?.type === "required" && (
                <p role="alert" className="text-red-500">
                  password is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="cursor-pointer flex items-center justify-start">
                <input
                  {...register("checkbox", { required: true })}
                  type="checkbox"
                  className="checkbox"
                />
                <span className="label-text ml-2">
                  Accept{" "}
                  <Link to="/termsandpolicy" className="link link-primary">
                    Terms & privicay policy
                  </Link>
                </span>
              </label>
            </div>
            <input
              className="btn btn-primary  w-full max-w-xs"
              type="submit"
              value="Signup"
            />
            <div className="divider">OR</div>
            <button className="btn btn-outline w-full max-w-xs">
              <AiOutlineGoogle size={25} />
              <span className="mt-1">Signup with google</span>
            </button>
            <div className="text-center">
              Alredy Have Account?
              <Link to="/login" className="link link-primary">
                Login now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;