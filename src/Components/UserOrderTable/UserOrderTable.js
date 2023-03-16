import React from "react";

function UserOrderTable({
  item,
  index,
  setModalInfo,
  priceConverter,
  orderPay,
  deleteOrder,
}) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{item?.userName}</td>
      <td>{item?.productname}</td>
      <td>{item?.prTrnxID}</td>
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
        <button
          onClick={() => orderPay(item._id)}
          className="btn-primary btn rounded-md btn-sm"
        >
          Pay now
        </button>
      </td>
      <td>
        <button
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
