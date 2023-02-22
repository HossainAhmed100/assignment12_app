import React, { createContext } from "react";
export const AuthContext = createContext();
function AuthProvider({ children }) {
  const user = { user: "Name" };
  const createNewUser = (name, email, password) => {};
  const authinfo = { user, createNewUser };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
