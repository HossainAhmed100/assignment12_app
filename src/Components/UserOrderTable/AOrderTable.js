import React from "react";

function AOrderTable({
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
      <td className="">{item?.productname}</td>
      <td>{item?.prTrnxID ? item?.prTrnxID : "Payment Not Completed"}</td>
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
          <button className="btn-accent rounded-md btn-sm">PAID</button>
        ) : (
          <button className="btn-error rounded-md btn-sm">Not paid</button>
        )}
      </td>
      <td>
        {item?.paymentStatus ? (
          <button className="btn-success btn rounded-md btn-sm">Approve</button>
        ) : (
          <button className="btn-error btn rounded-md btn-sm">Cancel</button>
        )}
      </td>
    </tr>
  );
}

export default AOrderTable;
