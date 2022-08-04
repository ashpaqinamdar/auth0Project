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

function Dashboard() {
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
  }, []);

  return <div>name {userData.firstName}</div>;
}

export default Dashboard;
