import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
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
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const authinfo = { user, createNewUser, loginUser, upadteUser, logoutUser };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
