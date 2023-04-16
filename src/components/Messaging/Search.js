import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
// import { AuthContext } from "./AuthContext";
import { AuthProvider } from "../../context/AuthProvider";
import { getAuth } from "firebase/auth";
// import useAuth from "../../hooks/useAuth";

const Search = (props) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const auth = getAuth();
  //   const { anyUser } = useAuth();

  const anyUser = auth.currentUser;
  const userId = anyUser.uid;
  const ownersList = props.ownersList;
  const customersList = props.customersList;

  let currentUser = ownersList.find((owner) => owner.uid === userId);
  if (currentUser == null) {
    currentUser = customersList.find((customer) => customer.uid === userId);
  }

  //--------------------ORIGINAL------------------------------
  //   const handleSearch = async () => {
  //     const q = query(
  //       collection(db, "users"),
  //       //displayName does not exist in users. Also users collection doesn't exist
  //       where("displayName", "==", username)
  //     );
  //---------------------------------------------------------
  const handleSearch = async () => {
    let q = query(collection(db, "owners"), where("name", "==", username));
    if (q === null || q === "undefined") {
      q = query(collection(db, "customers"), where("name", "==", username));
    }

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    console.log("IN SEARCH");
    const combinedId =
      anyUser.uid > user.uid ? anyUser.uid + user.uid : user.uid + anyUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log("res", res);
      if (!res.exists()) {
        console.log("res2", res);
        //create a chat in chats collection
        //supposed to be creating a document with an id that is the combinedId but currently the document in the db right now looks like a short id (which i dont see in authentication ids)
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", anyUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.name,
            // displayName: user.displayName,
            // photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log(
          "why displayName not appearing in person you text",
          anyUser.name
        );
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: anyUser.uid,
            displayName: currentUser.name,
            // photoURL: anyUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          {/* <img src={user.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
