import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/index";

const root = document.getElementById("root");
render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  root
);
