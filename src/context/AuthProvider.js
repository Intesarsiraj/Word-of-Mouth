import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseconfig";
// import { db } from "../firebaseconfig.js";
import { getDocs, onSnapshot, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [anyUser, setAnyUser] = useState();
  // const [currentUserUID, setCurrentUserUID] = useState();
  // const [userDBInfo, setUserDBInfo] = useState();
  // const [ownersList, setOwnersList] = useState([]);
  // const [customersList, setCustomersList] = useState([]);
  // const customersCollectionRef = collection(db, "customers");
  // const ownersCollectionRef = collection(db, "owners");
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       console.log(user);
  //       console.log(uid);
  //       setAnyUser(user);
  //       setCurrentUserUID(uid);
  //       // ...
  //     }
  //     // else {
  //     //   // User is signed out
  //     //   // ...
  //     // }
  //   });
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUTHProvider", currentUser);
      setAnyUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log("anyUser", anyUser);
  // console.log("uid", currentUserUID);
  return (
    <AuthContext.Provider value={{ anyUser /*, createUser, signIn */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
