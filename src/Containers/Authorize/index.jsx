/** @format */

import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import { login } from "../../Auth0/auth0-spa";
import { getToken } from "../../Auth0/auth0-spa";
import { getAuth0Token } from "../../utils/localStorage";

function Authorize() {
  useEffect(() => {
    let type = localStorage.getItem("type");
    let authType = localStorage.getItem("authType");

    if (type === "login" && authType === "social") {
      fetchData();
    } else {
      login();
    }
    async function fetchData() {
      await getToken().then(async (data) => {
        let authResponse = await getAuth0Token();
        let user = await authResponse;
        localStorage.setItem(
          "authEmail",
          authResponse.body.decodedToken.user.email
        );
        await login();
      });
    }
  }, []);
  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "100px" }}>
      {/* <Loader type="Oval" color="#504294" height={60} width={60} /> */}
    </div>
  );
}

export default Authorize;
