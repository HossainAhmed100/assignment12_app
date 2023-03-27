import React from "react";
import UseHealmet from "../Hooks/UseHealmet";
import axios from "../axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../Components/ProductCard/ProductCard";
import LodingBar from "../Components/LodingBar/LodingBar";
function AllProducts() {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  //Fetch All Product
  const { data: products, isLoading } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const res = await axios.get("/allproducts", config);
      return res.data;
    },
  });

  //loading Animation
  if (isLoading) {
    return <LodingBar />;
  }
  return (
    <div className="py-10">
      <UseHealmet title={"All Product Page"} />
      <h1 className="font-bold text-2xl text-center py-10">All Products</h1>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-4 gap-4">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
