import React, { createContext } from "react";
export const AuthContext = createContext();
function AuthProvider({ children }) {
  const user = { user: "Name" };
  const authinfo = { user };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
