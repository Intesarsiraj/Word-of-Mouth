//What if we have create an error useState and setError, then console.log it in the catch block of the register function
// import { db } from "../firebaseconfig.js";
import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import Dropdown from "./Dropdown.js";
// import "./OwnerForm.js";
import { Link, Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";

function CustomerCreateAccount() {
  //   const usersCollectionRef = collection(db, "owners");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const [newPhone, setNewPhone] = useState(0);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    // console.log("InCreateAccount onAuthStateChanged. ", currentUser);
  });
  // console.log("InCreateAccount. ", user);
  const register = async () => {
    try {
      // this will create a new user in our authentication in firbase and at the same time in will log you in
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      // setAUser({ email: registerEmail, registerPassword: registerPassword });
      console.log(user);
      navigate("/customerForm");
      // console.log("InCreateAccount register. ", user);
    } catch (error) {
      alert("Check your email or password");
      console.log(error.message);
    }
  };

  return (
    <div>
      {/* <section className="section"> */}
      {/* <Link to="/">back home</Link> */}
      {/* </section> */}
      <h3> Customer Sign Up</h3>
      <input
        placeholder="Email..."
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password..."
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <button onClick={togglePasswordVisibility}>
        {showPassword ? "Hide" : "Show"} Password
      </button>
      <br></br>
      <br></br>
      <div>
        <button type="signUp" onClick={register}>
          {" "}
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default CustomerCreateAccount;
