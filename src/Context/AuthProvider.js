import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const createNewUser = async (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const upadteUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const logoutUser = async () => {
    return await signOut(auth);
  };

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const authinfo = { user, createNewUser, upadteUser, logoutUser };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
