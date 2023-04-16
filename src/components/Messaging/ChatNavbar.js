import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { getAuth } from "firebase/auth";
// import { AuthContext } from './AuthContext'
// import useAuth from "../../hooks/useAuth";

const ChatNavbar = (props) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const ownersList = props.ownersList;
  const customerList = props.customersList;

  console.log("owners", ownersList);
  console.log("custs", customerList);

  let anyUser = ownersList.find((owner) => owner.uid === userId);

  if (anyUser == null) {
    anyUser = customerList.find((customer) => customer.uid === userId);
  }

  // const {currentUser} = useContext(AuthContext)
  //   const { anyUser } = useAuth();
  console.log("USER", anyUser);
  //What if a user doesn't have a photoUrl?
  // const photoURL = anyUser.photoURL ? anyUser.photoURL : ""
  //Also, anyUser.displayName --> anyUser doesn't have a displayName - should we add/adjust that when we have people sign up
  return (
    <div className="navbar">
      <span className="logo">Let's schedule an appointment?</span>
      <div className="user">
        {/* <img src={anyUser.photoURL} alt="" /> */}
        <span>{anyUser.name}</span>
        {/* <button onClick={() => signOut(auth)}>logout</button> */}
      </div>
    </div>
  );
};

export default ChatNavbar;
