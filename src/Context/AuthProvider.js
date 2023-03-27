import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);

  // User Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
    });
    return () => unSubscribe();
  }, []);

  const createNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Social Login
  const socialLogin = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  const upadteUser = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logoutUser = async () => {
    return await signOut(auth);
  };

  const authinfo = {
    user,
    createNewUser,
    loding,
    socialLogin,
    loginUser,
    resetPass,
    upadteUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
