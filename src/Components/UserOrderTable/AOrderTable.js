import React from "react";

function AOrderTable({
  item,
  index,
  setModalInfo,
  priceConverter,
  orderPay,
  confirmOrder,
  deleteOrder,
}) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{item?.userName}</td>
      <td className="">{item?.productname}</td>
      <td>
        {item?.transactionId ? item?.transactionId : "Payment Not Completed"}
      </td>
      <td>{priceConverter(item?.orderQuantity)} PCS</td>
      <td>{priceConverter(item?.totalPrice)}$</td>
      <td>
        <label
          htmlFor="userInfoModal"
          onClick={() => setModalInfo(item)}
          className="btn-info btn rounded-md btn-sm"
        >
          View info
        </label>
      </td>
      <td>
        {item?.paymentStatus ? (
          <div className="badge badge-success  badge-lg">PAID</div>
        ) : (
          <button className="btn-error rounded-md btn-sm">UNPAID</button>
        )}
      </td>
      <td>
        {item?.orderStatus === false ? (
          <button
            onClick={() => confirmOrder(item._id)}
            className="btn-success btn rounded-md btn-sm"
          >
            Approve
          </button>
        ) : (
          <button disabled className="btn-success btn rounded-md btn-sm">
            Approve
          </button>
        )}
      </td>
    </tr>
  );
}

export default AOrderTable;
