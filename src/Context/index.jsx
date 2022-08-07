import React, { createContext, useState } from "react";
import { getProfile } from "../utils/localStorage";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    getProfile() ? true : false
  );

  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  );
}

export { AuthContextProvider, AuthContext };
