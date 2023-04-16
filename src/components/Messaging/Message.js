import React, { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "./AuthContext";
import { AuthProvider } from "../../context/AuthProvider";
import { ChatContext } from "./ChatContext";
// import { db } from "../../firebaseconfig";
import useAuth from "../../hooks/useAuth";

const Message = ({ message }) => {
  const { anyUser } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === anyUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === anyUser.uid
              ? anyUser.photoURL //no photoUrls
              : data.user.photoURL //no photoUrls
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
