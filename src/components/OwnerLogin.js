import { useState } from "react";

import { signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseconfig";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

function OwnerLogin() {
  // const [owner, setOwner] = useState({});
  // props.owner = owner;
  // const setOwner = props.setOwner;
  // const { anyUser } = useAuth();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  console.log("AUTH in FBC: ", auth);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // console.log("setO", setOwner);
  const login = async () => {
    // let user
    try {
      // this will create a new user in our authentication in firbase and at the same time in will log you in
      console.log("user login try block has run");
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("UID", user)
      // setUser(userLocal);
      navigate("/owner/dash");
    } catch (error) {
      alert("Check your email or password");
      console.log(error.message);
    }
  };
  console.log(auth?.currentUser?.email)
  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );
      // console.log(thisuser);
      // setUser(thisuser);
      navigate("/owner/dash");
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };
  

  const logout = async () => {
    await signOut(auth);
    // setOwner({ email: loginEmail, loginPassword: loginPassword });
    navigate("/owner/dash");
    console.log(loginEmail, "Logout", loginPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginPassword || !loginEmail) return;
    // setOwner({ email: loginEmail, loginPassword: loginPassword });
    // navigate("/customer/dash");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3> Owner Login </h3>
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
        <button onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"} Password
        </button>

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

export default OwnerLogin;
