import { getAuth } from "firebase/auth";
import React from "react";
import ChatNavbar from "./ChatNavbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const ownersList = props.ownersList;
  const customersList = props.customersList;

  let anyUser = ownersList.find((owner) => owner.uid === userId);
  if (anyUser == null) {
    anyUser = customersList.find((customer) => customer.uid === userId);
  }
  return (
    <div className="sidebar">
      <ChatNavbar ownersList={ownersList} customersList={customersList} />
      <Search ownersList={ownersList} customersList={customersList} />
      <Chats />
    </div>
  );
};

export default Sidebar;
