import React from "react";

function ProductCard({ product }) {
  const {
    imgUrl,
    minorderquantity,
    prdescription,
    productname,
    productprice,
    availablequantity,
  } = product;
  return (
    <div className=" bg-base-100 flex flex-col items-center justify-between custom_box">
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
          Available Quantity : <span className="link">{availablequantity}</span>
        </h2>
        <h2 className="font-medium">
          Minimum Order Quantity :{" "}
          <span className="link">{minorderquantity}</span>
        </h2>
        <p className="line-clamp-3">{prdescription}</p>
        <button className="btn w-full btn-primary">Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
