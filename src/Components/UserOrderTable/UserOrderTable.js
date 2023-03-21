import React from "react";
import { Link } from "react-router-dom";

function UserOrderTable({
  item,
  index,
  setModalInfo,
  priceConverter,
  deleteOrder,
}) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="avatar">
          <div className="mask rounded-md w-12 border-2 h-12">
            <img
              className="rounded-md"
              src={item?.imgUrl}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
      </td>
      <td>{item?.productname}</td>
      <td>{item?.transactionId ? item?.transactionId : "Pay Before"}</td>
      <td>{priceConverter(item?.orderQuantity)} PCS</td>
      <td>{priceConverter(item?.totalPrice)}$</td>
      <td>
        <label
          htmlFor="userInfoModal"
          onClick={() => setModalInfo(item)}
          className="btn-success btn rounded-md btn-sm"
        >
          View info
        </label>
      </td>
      <td>
        {item?.orderStatus ? (
          <button className="btn-success rounded-md btn-sm">Approve</button>
        ) : (
          <button className="btn-warning rounded-md btn-sm">Pending</button>
        )}
      </td>
      <td>
        {item?.paymentStatus ? (
          <button className="btn-success rounded-md btn-sm">PAID</button>
        ) : (
          <Link
            to={`/user/payment/${item._id}`}
            className="btn-primary btn rounded-md btn-sm"
          >
            Pay now
          </Link>
        )}
      </td>
      <td>
        <button
          disabled={item.paymentStatus}
          onClick={() => deleteOrder(item._id)}
          className="btn-error btn rounded-md btn-sm"
        >
          Cencel
        </button>
      </td>
    </tr>
  );
}

export default UserOrderTable;
