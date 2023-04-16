import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { AuthProvider } from "../../context/AuthProvider";
import { ChatContext } from "./ChatContext";
import { db } from "../../firebaseconfig";
import Message from "./Message";


const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
        unSub();
    };
}, [data.chatId]);

console.log("mesaages", messages)

return (
    <div className="messages">
    {messages.map((m) => (
        <Message message={m} key={m.id} />
    ))}
    </div>
);
};

export default Messages;