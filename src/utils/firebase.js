import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBM8k5n3d9d-XdOfWB658iI-AjmqNSyisQ",
  authDomain: "auth0-f01fd.firebaseapp.com",
  projectId: "auth0-f01fd",
  storageBucket: "auth0-f01fd.appspot.com",
  messagingSenderId: "69054280798",
  appId: "1:69054280798:web:23bad0508c6d9afe63b0cf",
  measurementId: "G-60J1HQGQHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const checkUserExists = async (email) => {
  let rawData = [];
  let id = "";

  const q = query(collection(db, "userData"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    rawData.push(doc.data());
    id = doc.id;
  });
  let data = rawData[0];
  return data;
};

export { db };
