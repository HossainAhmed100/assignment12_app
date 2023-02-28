import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "../axios";
import ProductCard from "../Components/ProductCard/ProductCard";

function Home() {
  //Fetch All Product
  const { data: products = [] } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const res = await axios.get("/allproducts");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto gap-10">
      <div>
        <div className="hero hero_bg my-4 rounded-xl">
          <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to MATERIA</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <h1 className="text-center text-4xl py-4 font-bold">Our New Product</h1>
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

export default Home;
