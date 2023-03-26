import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";

function Forgatpassword() {
  const { resetPass } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    setErr(null);
    await resetPass(data.email)
      .then(() => {
        Swal.fire({
          title: "Success",
          icon: "success",
          html: "Your Password Reset Email Sent Successfully <br> Please Check Your Email <b>inbox</b> or <b>Spam box</b>",
          confirmButtonText: "OK",
          footer:
            '<a target="_blank" href="https://mail.google.com/mail/u/0/#inbox">Open Your Gmail</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
        reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          setErr("User Not Found!");
        }
      });
  };
  return (
    <div className="flex items-center h-screen justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 bg-white p-8 custom_box w-96"
      >
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        {err && <p className="text-red-500">{err}</p>}
        <div className="form-control">
          <label>Type Your Email *</label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email..."
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email is Required
            </p>
          )}
        </div>
        <input
          className="btn btn-primary  w-full max-w-xs"
          type="submit"
          value="SEND"
        />
      </form>
    </div>
  );
}

export default Forgatpassword;
