import React from "react";
import "./index.css";
import { FaSignOutAlt } from "react-icons/fa";
function Navbar({ logOutHandler }) {
  return (
    <div>
      <div className="navbar">
        <div className="logo">Auth0</div>
        <div className="logout" onClick={logOutHandler}>
          <FaSignOutAlt style={{ cursor: "pointer" }} title="Logout" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
