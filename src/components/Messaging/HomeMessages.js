import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./MessageStyle.css";
const HomeMessages = (props) => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar
          ownersList={props.ownersList}
          customersList={props.customersList}
        />
        <Chat />
      </div>
    </div>
  );
};

export default HomeMessages;
