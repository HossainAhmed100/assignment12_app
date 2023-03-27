import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React, { useContext } from "react";
import LodingBar from "../../Components/LodingBar/LodingBar";
import AdminUserTable from "../../Components/UserOrderTable/AdminUserTable";
import { AuthContext } from "../../Context/AuthProvider";

function AUser() {
  const { user } = useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const {
    data: allUser = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["alluser"],
    queryFn: async () => {
      const res = await axios.get("alluser", config);
      return res.data;
    },
  });
  if (isLoading) {
    return <LodingBar />;
  }
  const roleHandle = async (id, role) => {
    const roles = role === "Admin" ? "User" : "Admin";
    await axios
      .put(`updateuserrole/${user?.email}`, { id, roles }, config)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                <th>Address</th>
                <th>Phone</th>
                <th>ROLE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user, index) => (
                <AdminUserTable
                  key={user._id}
                  roleHandle={roleHandle}
                  index={index}
                  user={user}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AUser;
