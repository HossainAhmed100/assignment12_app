import React, { useContext, useState } from "react";
import {
  AiOutlineGoogle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseHealmet from "../Hooks/UseHealmet";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import axios from "../axios";
function Login() {
  const [isOPEN, setIsOPEN] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const [loginErr, setLoginErr] = useState("");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setLoginErr("");
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        const currestUser = { email: user.email };

        // Get JWT Token
        axios
          .post("jwt", { ...currestUser })
          .then((res) => {
            localStorage.setItem("token", res?.data?.token);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });

        toast.success("Log in Sucessed!");
      })
      .catch((error) => {
        const errorCode = error.code.split("/")[1];
        setLoginErr(errorCode);
      });
  };

  return (
    <div>
      <UseHealmet title={"Login Page"} />
      <div className="container mx-auto">
        <div className="lg:p-20 p-4 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 bg-white p-8 custom_box w-96"
          >
            <h1 className="text-2xl font-bold text-center">Login now</h1>
            {loginErr && (
              <h1 className="text-base font-normal text-red-500 text-center">
                {loginErr}
              </h1>
            )}

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
            <div className="text-end">
              <Link to="/forgatpassword" className="link link-primary">
                Forgat Passwodr ?
              </Link>
            </div>
            <input
              className="btn btn-primary  w-full max-w-xs"
              type="submit"
              value="Login"
            />
            <div className="divider">OR</div>
            <button className="btn btn-outline w-full max-w-xs">
              <AiOutlineGoogle size={25} />
              <span className="mt-1">Login with google</span>
            </button>
            <div className="text-center">
              Don't Have Account?
              <Link to="/signup" className="link link-primary">
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
