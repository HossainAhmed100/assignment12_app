import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React from "react";
import LodingBar from "../../Components/LodingBar/LodingBar";
import AdminUserTable from "../../Components/UserOrderTable/AdminUserTable";

function AUser() {
  const { data: allUser = [], isLoading } = useQuery({
    queryKey: ["alluser"],
    queryFn: async () => {
      const res = await axios.get("alluser");
      return res.data;
    },
  });
  if (isLoading) {
    return <LodingBar />;
  }
  return (
    <div>
      <div className="bg-white rounded-3xl p-8 custom-border custom-shadow">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user, index) => (
                <AdminUserTable key={user._id} index={index} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AUser;
