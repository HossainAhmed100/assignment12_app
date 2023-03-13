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
  const [serverUser, setServerUser] = useState(null);
  const [loding, setLoding] = useState(true);

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser.email) {
        const url = `http://localhost:5000/signleUser/${currentUser.email}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setServerUser(data);
            setLoding(false);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  const createNewUser = async (email, password) => {
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

  const authinfo = {
    user,
    createNewUser,
    loding,
    loginUser,
    upadteUser,
    serverUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
