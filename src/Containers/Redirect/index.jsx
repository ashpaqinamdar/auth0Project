import React, { useEffect, useState } from "react";
import { getToken } from "../../Auth0/auth0-spa";
import { getAuth0Token, saveProfile } from "../../utils/localStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "../../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// import Loader from "react-loader-spinner";

function RedirectDashboard() {
  const navigate = useHistory();
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    getAuthToken();
  }, []);

  const saveUser = async () => {
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let email = localStorage.getItem("authEmail");
    let type = localStorage.getItem("type");
    if (type !== "login") {
      try {
        await addDoc(collection(db, "userData"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          created: Timestamp.now(),
        });
      } catch (err) {
        console.log("dd", err);
      }
    }
  };

  const setAppAuthData = (authResponse) => {
    saveProfile({
      userName: authResponse.body.decodedToken.user.name,
      attributes: authResponse.body.decodedToken,
      accessToken: authResponse.body.access_token,
      idToken: authResponse.body.id_token,
      refreshToken: authResponse.body.refresh_token,
    });
  };

  const getAuthToken = async () => {
    await getToken()
      .then(async (data) => {
        navigate("/dashboard", { replace: true });
        await saveUser();
        // setAppAuthData();
      })
      .catch((e) => {
        console.log("ddd", e);
      });
  };

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "100px" }}>
      {/* <Loader type="Oval" color="#504294" height={60} width={60} /> */}
    </div>
  );
}

export default RedirectDashboard;
