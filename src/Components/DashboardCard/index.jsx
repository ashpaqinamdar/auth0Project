import React from "react";
import "./index.css";

function DashboardCard({ userData }) {
  return (
    <div className="dashCard">
      <div>
        <img
          src={userData.profilePic}
          className="dashPic"
          referrerPolicy="no-referrer"
          alt="profile picture"
        />
      </div>
      <div className="infoSection">
        <div>
          <span style={{ fontWeight: "bold" }}>First Name :</span>{" "}
          {userData.firstName}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Last Name :</span>{" "}
          {userData.lastName}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Email Id :</span>{" "}
          {userData.email}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
