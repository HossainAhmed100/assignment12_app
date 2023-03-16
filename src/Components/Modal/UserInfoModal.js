import React from "react";

function UserInfoModal({ item }) {
  const { userName, userAddress, userPhone, userEmail } = item;
  return (
    <div>
      <input type="checkbox" id="userInfoModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="divide-y">
            <p className="p-2">
              <span>Name : </span>
              <span>{userName}</span>
            </p>
            <p className="p-2">
              <span>Email : </span>
              <span>{userEmail}</span>
            </p>
            <p className="p-2">
              <span>Phone : </span>
              <span>{userPhone}</span>
            </p>
            <p className="p-2">
              <span>Address : </span>
              <span>{userAddress}</span>
            </p>
          </div>
          <div className="modal-action">
            <label htmlFor="userInfoModal" className="btn btn-wide">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoModal;
