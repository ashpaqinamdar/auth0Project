/** @format */

import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import { login } from "../../Auth0/auth0-spa";

function Authorize() {
  useEffect(() => {
    login();
  }, []);
  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "100px" }}>
      {/* <Loader type="Oval" color="#504294" height={60} width={60} /> */}
    </div>
  );
}

export default Authorize;
