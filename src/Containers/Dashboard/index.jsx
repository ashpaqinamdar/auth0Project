import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import DashboardCard from "../../Components/DashboardCard";
import { logout } from "../../Auth0/auth0-spa";
import { checkUserExists } from "../../utils/firebase";

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUserData() {
      let email = localStorage.getItem("authEmail");
      let data = await checkUserExists(email);
      setUserData(data);
    }
    getUserData();
    document.body.style = "background: white;";
    return (document.body.style = "background: inherit;");
  }, []);

  const logOutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
  };

  return (
    <div>
      <Navbar logOutHandler={logOutHandler} />
      <div style={{ padding: "80px 40px" }}>
        <DashboardCard userData={userData} />
      </div>
    </div>
  );
}

export default Dashboard;
