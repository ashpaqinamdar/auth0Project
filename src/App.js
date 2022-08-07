/** @format */

import React, { Suspense, Component, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Containers/AuthPage/index";
import Authorize from "./Containers/Authorize";
import RedirectDashboard from "./Containers/Redirect";
import Dashboard from "./Containers/Dashboard/index";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./Context/index";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/social" component={Login} />
      <Route path="/authorize" component={Authorize} />
      <Route path="/login-redirect" component={RedirectDashboard} />

      <Route path="/" component={Login} />
      <Route exact path={"/"} component={Login}></Route>
      <Route path="*" component={Login} />
    </Switch>
  );

  let AuthRoutes = (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" component={Dashboard} />
    </Switch>
  );

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading..</div>}>
          {isAuthenticated ? AuthRoutes : routes}
        </Suspense>
      </Router>
      <ToastContainer newestOnTop={false} position="bottom-right" />
    </>
  );
};

export default App;
