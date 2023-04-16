import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";
import { db } from "../../firebaseconfig";
// import { AuthProvider } from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { anyUser } = useAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", anyUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    anyUser.uid && getChats();
  }, [anyUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log("chats", chats);
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            {/* <img src={chat[1].userInfo.photoURL} alt="" /> */}
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
