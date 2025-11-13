import React, { useEffect, useState } from "react";

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
import { auth } from "../Firebase/Firebase.init";
import { AuthContex } from "./AuthContex";
const provider = new GoogleAuthProvider();

const ContexProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscrib = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscrib();
  }, []);

  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, url) => {
    return updateProfile(user, { displayName: name, photoURL: url });
  };
  const signWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };
  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // const authData = { user, createAccount, loading };

  const authData = {
    user,
    createAccount,
    loading,
    setLoading,
    login,
    logOut,
    updateUserProfile,
    signWithGoogle,
    passwordReset,
  };
  return <AuthContex.Provider value={authData}>{children}</AuthContex.Provider>;
};

export default ContexProvider;
