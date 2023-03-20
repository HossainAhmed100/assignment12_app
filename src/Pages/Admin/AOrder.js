import { useQuery } from "@tanstack/react-query";
import axios from "../../axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import LodingBar from "../../Components/LodingBar/LodingBar";
import AOrderTable from "../../Components/UserOrderTable/AOrderTable";
import UserInfoModal from "../../Components/Modal/UserInfoModal";

function AOrder() {
  const [modalInfo, setModalInfo] = useState(null);
  const { data: order = [], isLoading } = useQuery({
    queryKey: ["allOrder"],
    queryFn: async () => {
      const res = await axios.get(`/allOrder`);
      return res.data;
    },
  });
  //loading Animation
  if (isLoading) {
    return <LodingBar />;
  }
  const deleteOrder = (infos) => {
    Swal.fire(infos);
  };
  const orderPay = (infos) => {
    Swal.fire(infos);
  };

  const priceConverter = (num) => {
    var str = num.toString().split(".");
    if (str[0].length >= 4) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 4) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(",");
  };

  return (
    <div>
      <div className="bg-white rounded-3xl p-8 custom-border custom-shadow">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>USER</th>
                <th>Product</th>
                <th>TRNX ID</th>
                <th>Quantity</th>
                <th>Total Price $</th>
                <th>Delivery info</th>
                <th>Payment Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((item, index) => (
                  <AOrderTable
                    key={item._id}
                    index={index}
                    orderPay={orderPay}
                    deleteOrder={deleteOrder}
                    item={item}
                    setModalInfo={setModalInfo}
                    priceConverter={priceConverter}
                  />
                ))}
            </tbody>
          </table>
          {modalInfo && <UserInfoModal item={modalInfo} />}
        </div>
      </div>
    </div>
  );
}

export default AOrder;
