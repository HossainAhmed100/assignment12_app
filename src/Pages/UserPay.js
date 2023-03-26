import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import LodingBar from "../Components/LodingBar/LodingBar";
import { useForm } from "react-hook-form";
import UseHealmet from "../Hooks/UseHealmet";

function UserPay() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Fetch Product By ID Params
  useEffect(() => {
    const loadProduct = async () => {
      const url = `getUserOrder/${id}`;
      await axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            setOrder(res.data);
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <LodingBar />;
  }
  const {
    orderQuantity,
    totalPrice,
    userEmail,
    userPhone,
    userAddress,
    imgUrl,
    _id,
    productname,
  } = order;

  const onSubmit = async (data) => {
    const transactionId = data.transactionId;
    await axios
      .put(`paymentUpdate/${_id}`, { transactionId })
      .then((res) => {
        if (res.data.matchedCount === 1) {
          navigate("/user/order");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-10">
      <UseHealmet title={"Order Payment Page"} />
      <div className="grid grid-cols-2">
        <div className=" bg-base-100 m-2 flex flex-col items-center justify-between custom_box">
          <div className="px-10 pt-10">
            <img
              src={imgUrl}
              alt="ProductImage"
              className="rounded-xl object-contain h-40 w-96"
            />
          </div>
          <div className="flex gap-2 p-10 flex-col items-start justify-start">
            <h2 className="card-title">{productname}</h2>
            <h2 className="font-medium">
              Total Quantity : <span className="link">{orderQuantity}</span>
            </h2>
            <h2 className="font-medium">
              Total Price : <span className="link">{totalPrice}</span>
            </h2>
            <h2 className="font-medium">
              Email : <span className="link">{userEmail}</span>
            </h2>
            <h2 className="font-medium">
              Phone : <span className="link">{userPhone}</span>
            </h2>
            <h2 className="font-medium">
              Address : <span className="link">{userAddress}</span>
            </h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 bg-white p-8 custom_box w-96"
        >
          <h1 className="text-2xl font-bold text-center">
            Submin Payment info
          </h1>
          <div className="form-control">
            <label>Transaction ID *</label>
            <input
              {...register("transactionId", { required: true })}
              type="text"
              placeholder="Enter Transaction ID"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.transactionId?.type === "required" && (
              <p role="alert" className="text-red-500">
                Transaction is required
              </p>
            )}
          </div>
          <input
            className="btn btn-primary  w-full max-w-xs"
            type="submit"
            value="Confirm"
          />
        </form>
      </div>
    </div>
  );
}

export default UserPay;
