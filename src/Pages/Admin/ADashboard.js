import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React from "react";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TiChartPie, TiUser } from "react-icons/ti";
import { RiMessage3Fill } from "react-icons/ri";
import LodingBar from "../../Components/LodingBar/LodingBar";
import UseHealmet from "../../Hooks/UseHealmet";

function ADashboard() {
  const { data: products = [] } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      const res = await axios.get("/allproducts");
      return res.data;
    },
  });

  const { data: alluser = [] } = useQuery({
    queryKey: ["alluser"],
    queryFn: async () => {
      const res = await axios.get("alluser");
      return res.data;
    },
  });

  const { data: allOrder = [], isLoading } = useQuery({
    queryKey: ["allOrder"],
    queryFn: async () => {
      const res = await axios.get("allOrder");
      return res.data;
    },
  });

  const { data: allReviews = [] } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axios.get("allreviews");
      return res.data;
    },
  });
  if (isLoading) {
    return <LodingBar />;
  }
  return (
    <div className="p-10">
      <UseHealmet title={"Admin Dashboard"} />
      <div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div className=" hover:border-blue-400 duration-300  rounded-sm cursor-pointer p-8 custom_box">
            <div className="flex items-center gap-4">
              <TiChartPie size={40} />

              <h3 className="text-3xl font-bold sm:text-4xl">
                {products.length}
              </h3>
            </div>

            <p className="mt-4 font-medium text-gray-500">Product Quantity</p>
          </div>
          <div className=" hover:border-blue-400 duration-300  rounded-sm cursor-pointer p-8 custom_box">
            <div className="flex items-center gap-4">
              <TiUser size={40} />

              <h3 className="text-3xl font-bold sm:text-4xl">
                {alluser.length}
              </h3>
            </div>

            <p className="mt-4 font-medium text-gray-500">Total User</p>
          </div>
          <div className=" hover:border-blue-400 duration-300  rounded-sm cursor-pointer p-8 custom_box">
            <div className="flex items-center gap-4">
              <GiCardboardBoxClosed size={40} />

              <h3 className="text-3xl font-bold sm:text-4xl">
                {allOrder.length}
              </h3>
            </div>

            <p className="mt-4 font-medium text-gray-500">Total Order</p>
          </div>

          <div className=" hover:border-blue-400 duration-300  rounded-sm cursor-pointer p-8 custom_box">
            <div className="flex items-center gap-4">
              <RiMessage3Fill size={40} />

              <h3 className="text-3xl font-bold sm:text-4xl">
                {allReviews.length}
              </h3>
            </div>

            <p className="mt-4 font-medium text-gray-500">Total Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ADashboard;
