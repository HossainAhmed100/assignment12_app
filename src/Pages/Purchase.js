import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import LodingBar from "../Components/LodingBar/LodingBar";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import UseHealmet from "../Hooks/UseHealmet";

function Purchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Fetch Product By ID Params
  useEffect(() => {
    const loadProduct = async () => {
      const url = `singleProduct/${id}`;
      await axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            setProduct(res.data);
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    };
    loadProduct();
  }, [id]);

  //loading Animation
  if (loading) {
    return <LodingBar />;
  }

  // Product Desctruct
  const {
    imgUrl,
    minorderquantity,
    prdescription,
    productname,
    productprice,
    _id,
    availablequantity,
  } = product;

  // Submit Order
  const onSubmit = async (data) => {
    const userName = user.displayName;
    const userEmail = user.email;
    const userPhone = data.phone;
    const productId = _id;
    const userAddress = data.address;
    const orderQuantity = data.order_quanriry;
    const paymentStatus = false;
    const prTrnxID = null;
    const orderStatus = false;
    const totalPrice = orderQuantity * productprice;
    const order = {
      productId,
      productname,
      userName,
      userEmail,
      imgUrl,
      prTrnxID,
      orderStatus,
      userPhone,
      totalPrice,
      paymentStatus,
      userAddress,
      orderQuantity,
    };
    await axios
      .post(`placeNewOrder/${userEmail}`, { order })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Order Place Succeded!");
          navigate("/user/order");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="py-10 md:px-20 px-5">
      <UseHealmet title={"Order Page"} />
      <div className="bg-base-100 flex items-center gap-4">
        <div className="w-96 bg-base-100 m-2 flex flex-col items-center justify-between">
          <div className="px-10 pt-10">
            <img
              src={imgUrl}
              alt="ProductImage"
              className="rounded-xl object-contain h-40 w-96"
            />
          </div>
          <div className="flex gap-2 p-10 flex-col items-start justify-start">
            <h2 className="card-title">{productname}</h2>
            <h2 className="card-title">
              Price :{" "}
              <button className="btn btn-error btn-sm">${productprice}</button>
            </h2>
            <h2 className="font-medium">
              Available Quantity :{" "}
              <span className="link">{availablequantity}</span>
            </h2>
            <h2 className="font-medium">
              Minimum Order Quantity :{" "}
              <span className="link">{minorderquantity}</span>
            </h2>
            <p className="line-clamp-3">{prdescription}</p>
          </div>
        </div>
        <div className="bg-base-100 px-10 py-5 flex flex-col items-center justify-between ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-96">
            <div className="form-control w-full max-w-xs">
              <label className="label">Name</label>
              <input
                type="text"
                defaultValue={user?.displayName || ""}
                disabled
                placeholder="Type Your Name"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                disabled
                placeholder="Type Your Email"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">Phone</label>
              <input
                type="number"
                {...register("phone", { required: true })}
                placeholder="Type Your Phone Number"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.phone?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Phone is required
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">Address</label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Type Your Address"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.address?.type === "required" && (
                <p role="alert" className="text-red-500">
                  Address is required
                </p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Available Quantity :</span>
                <span className="label-text-alt">{availablequantity}</span>
              </label>
              <input
                type="number"
                placeholder="Quantity"
                {...register("order_quanriry", {
                  required: { value: true, message: " Quantity is required" },
                  min: {
                    value: minorderquantity,
                    message: "Plz Check Minimun Order Quantity",
                  },
                  max: {
                    value: availablequantity,
                    message: "Plz Check Available Product Quantity",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.order_quanriry && (
                <p role="alert" className="text-red-500">
                  {errors.order_quanriry.message}
                </p>
              )}
              <label className="label">
                <span className="label-text-alt">Minimum Order Quantity :</span>
                <span className="label-text-alt">{minorderquantity}</span>
              </label>
            </div>
            <input
              type="submit"
              value="BY NOW"
              className="btn w-full max-w-xs btn-primary"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Purchase;
