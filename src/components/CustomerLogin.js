import { useState, useContext } from "react";

import { signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseconfig";
// import { useNavigate } from "react-router-dom";
// import CustomerDashboard from "./CustomerDashboard";
// import { link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { async } from "@firebase/util";

function CustomerLogin(/*{ setCustomer }*/) {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const setCustomer = props.setCustomer;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // console.log(auth?.currentUser?.email)
  const login = async () => {
    try {
      // this will create a new user in our authentication in firbase and at the same time in will log you in
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      // setCustomer({ email: loginEmail, loginPassword: loginPassword });
      console.log(user);
      // setUser(user);
      navigate("/customer/dash");
    } catch (error) {
      alert("Check your email or password");
      console.log("ERROR", error.message);
    }
  };
  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );
      // console.log(thisuser);
      // setUser(thisuser);
      navigate("/customer/dash");
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };
  
  const logout = async () => {
    await signOut(auth);
    // setAUser({ email: loginEmail, loginPassword: loginPassword });
    navigate("/");
    console.log(loginEmail, "Logout", loginPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginPassword || !loginEmail) return;
    // setCustomer({ email: loginEmail, loginPassword: loginPassword });
    // navigate("/owner/dash");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3> Customer Login </h3>
        <input
          type="email"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <div>
          <button onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <div>
          <button type="submit" onClick={login}>
            {" "}
            Login
          </button>
          <div>
          <button onClick={logInWithGoogle}> Log In With Google</button>
          </div>  
        </div>
      </form>
    </div>
  );
}

export default CustomerLogin;
