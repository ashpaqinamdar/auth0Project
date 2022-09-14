import React, { useEffect, useState } from "react";
import { getToken } from "../../Auth0/auth0-spa";
import {
  getAuth0Token,
  saveProfile,
  getProfile,
} from "../../utils/localStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { db, checkUserExists } from "../../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { Grid } from "react-loader-spinner";

function RedirectDashboard() {
  const navigate = useHistory();
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    getAuthToken();
    document.body.style = "background: white;";
    return (document.body.style = "background: inherit;");
  }, []);

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
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let email = localStorage.getItem("authEmail");
    let type = localStorage.getItem("type");
    let authType = localStorage.getItem("authType");
    let authResponse = "";
    await getToken().then(async (data) => {
      authResponse = await getAuth0Token();
      await setAppAuthData(authResponse);
    });

    if (type !== "login") {
      try {
        await addDoc(collection(db, "userData"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          created: Timestamp.now(),
          profilePic: authResponse.body.decodedToken.user.picture,
          isSocial: false,
        });
      } catch (err) {
        console.log("dd", err);
      }
      navigate.push("/dashboard", { replace: true });
    } else if (type === "login" && authType === "social") {
      let user = await checkUserExists(email);

      if (user === undefined) {
        toast.error("User does not exist");
        navigate.push("/login", { replace: true, isExist: true });
        return;
      } else {
        navigate.push("/dashboard", { replace: true, isExist: true });
      }
    } else {
      navigate.push("/dashboard", { replace: true });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <Grid color="#00BFFF" height={100} width={100} />
    </div>
  );
}

export default RedirectDashboard;
