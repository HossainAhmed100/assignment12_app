import React, { useContext } from "react";
import UseHealmet from "../Hooks/UseHealmet";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { RiMessage3Fill } from "react-icons/ri";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "../axios";
import LodingBar from "../Components/LodingBar/LodingBar";
function UserDashboard() {
  const { user, loding } = useContext(AuthContext);

  // Get User Order
  const { data = [] } = useQuery({
    queryKey: ["allOrder", user],
    queryFn: async () => {
      try {
        const res = await axios.get(`allOrder/${user?.email}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Get User Reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["allreviews", user],
    queryFn: async () => {
      try {
        const res = await axios.get(`allreviews/${user?.email}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Loading Animation
  if (loding) {
    return <LodingBar />;
  }

  return (
    <div className="p-10">
      <UseHealmet title={"User Dashboard"} />
      <div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative hover:border-blue-400 duration-300 block rounded-sm cursor-pointer p-4 custom_box sm:p-6 lg:p-8">
            <div className="flex items-center gap-4">
              <GiCardboardBoxClosed size={40} />

              <h3 className="text-3xl font-bold sm:text-4xl">{data.length}</h3>
            </div>

            <p className="mt-4 font-medium text-gray-500">Total Order</p>
          </div>
          <div className="relative hover:border-blue-400 duration-300 block rounded-sm cursor-pointer p-4 custom_box sm:p-6 lg:p-8">
            <div className="flex items-center gap-4">
              <RiMessage3Fill size={40} />

              <h3 className="text-3xl font-bold sm:text-4xl">
                {reviews.length}
              </h3>
            </div>

            <p className="mt-4 font-medium text-gray-500">Total Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
