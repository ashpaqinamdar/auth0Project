/** @format */

import React, { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { login } from "../../Auth0/auth0-spa";
import { getToken } from "../../Auth0/auth0-spa";
import { getAuth0Token, saveProfile } from "../../utils/localStorage";
import { Grid } from "react-loader-spinner";

function Authorize() {
  useEffect(() => {
    let type = localStorage.getItem("type");
    let authType = localStorage.getItem("authType");

    if (type === "login" && authType === "social") {
      fetchData();
    } else {
      login();
    }

    const setAppAuthData = (authResponse) => {
      saveProfile({
        userName: authResponse.body.decodedToken.user.name,
        attributes: authResponse.body.decodedToken,
        accessToken: authResponse.body.access_token,
        idToken: authResponse.body.id_token,
        refreshToken: authResponse.body.refresh_token,
      });
    };
    async function fetchData() {
      await getToken().then(async (data) => {
        let authResponse = await getAuth0Token();
        let user = await authResponse;
        await setAppAuthData(authResponse);
        localStorage.setItem(
          "authEmail",
          authResponse.body.decodedToken.user.email
        );
        await login();
      });
    }
    document.body.style = "background: white;";
    return (document.body.style = "background: inherit;");
  }, []);
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

export default Authorize;
