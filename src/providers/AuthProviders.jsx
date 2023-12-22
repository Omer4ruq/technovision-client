import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// import useAxiosPublic from "../hooks/useAxiosPublic";

// import axios from "axios";
const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName,
      photoURL
    );
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     const userEmail = currentUser?.email || user?.email;
  //     const loggedUser = { email: userEmail };
  //     setUser(currentUser);
  //     setLoading(false);
  //     if (currentUser) {
  //       axios
  //         .post("https://newspaper-server-zeta.vercel.app/jwt", loggedUser, {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           console.log("token response", res.data);
  //         });
  //     } else {
  //       axios
  //         .post(
  //           "https://newspaper-server-zeta.vercel.app/logout",
  //           loggedUser,
  //           {
  //             withCredentials: true,
  //           }
  //         )
  //         .then((res) => {
  //           console.log("token response", res.data);
  //         });
  //     }
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, []);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      //   if (currentUser) {
      //     // GET TOKEN AND STORE CLIENT
      //     const userInfo = { email: currentUser.email };
      //     axiosPublic.post("jwt", userInfo).then((res) => {
      //       if (res.data.token) {
      //         localStorage.setItem("access-token", res.data.token);
      //       }
      //     });
      //   } else {
      //     // remove token(if token stored in the client local storage, caching in memory)
      //     localStorage.removeItem("access-token");
      //   }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);
  const userInfo = {
    user,
    loading,
    createUser,
    logOut,
    signIn,
    googleSignIn,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
