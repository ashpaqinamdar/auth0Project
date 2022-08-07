import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  Timestamp,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import Navbar from "../../Components/Navbar";
import DashboardCard from "../../Components/DashboardCard";
import { logout } from "../../Auth0/auth0-spa";
import { Grid } from "react-loader-spinner";

function Dashboard() {
  const logOutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
  };
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function getUserData() {
      let rawData = [];
      let id = "";
      const q = query(
        collection(db, "userData"),
        where("email", "==", localStorage.getItem("authEmail"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        rawData.push(doc.data());
        id = doc.id;
      });
      let data = rawData[0];
      data.id = id;
      setUserData(data);
    }
    getUserData();
    document.body.style = "background: white;";
    return (document.body.style = "background: inherit;");
  }, []);

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
