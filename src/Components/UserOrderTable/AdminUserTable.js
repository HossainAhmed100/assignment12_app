import React from "react";
import lofos from "../../Utility/icon/man.png";

function AdminUserTable({ user, index, roleHandle }) {
  const { email, name, role, phone, _id, address } = user;
  return (
    <tr>
      <th>{index}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={lofos} alt="User Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">
              Role : <span className="badge badge-ghost badge-sm">{role}</span>{" "}
            </div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <th>
        {role === "Admin" ? (
          <button
            onClick={() => roleHandle(_id, role)}
            className="btn btn-error btn-sm"
          >
            Remove Admin
          </button>
        ) : (
          <button
            onClick={() => roleHandle(_id, role)}
            className="btn btn-warning btn-sm"
          >
            Make Admin
          </button>
        )}
      </th>
    </tr>
  );
}

export default AdminUserTable;
