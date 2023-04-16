//Customer Form is basically just like the authorization login
//-- how do we make sure you can do them at one time and make sure they get saved in both databases
import { db } from "../firebaseconfig.js";
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import Dropdown from "./Dropdown.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
// import "./CustomerForm.css";
// import { Link } from "react-router-dom";
// import { auth } from "../firebaseconfig";

function CustomerForm(props) {
  const { anyUser } = useAuth();
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [newHeardFrom, setNewHeardFrom] = useState("true");
  const [newCity, setNewCity] = useState("");
  const [select, setSelect] = useState();
  const navigate = useNavigate();

  // const usersCollectionRef = collection(db, "customers");
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  // const [user, setUser] = useState({});
  const createCustomer = props.createCustomer;

  return (
    <div>
      <h3> Register Customer</h3>

      <div>
        <input
          placeholder="Customer's Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="Phone number (no spaces)"
          onChange={(event) => {
            setNewPhone(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          placeholder="City"
          onChange={(event) => {
            setNewCity(event.target.value);
          }}
        />
      </div>

      <div>
        <h3>Heard By Word of Mouth?</h3>
      </div>
      <div>
        <select
          placeholder="Heard through word of mouth"
          options={Dropdown.options}
          onChange={(e) => setSelect(e.target.value)}
          value={select}
        >
          <option></option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div>
        <button
          onClick={() => {
            createCustomer(
              newName,
              newPhone,
              newEmail,
              newHeardFrom,
              newCity,
              anyUser.uid
            );
            setDoc(doc(db, "userChats", anyUser.uid), {});
            navigate("/customer/dash");
          }}
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
}

export default CustomerForm;
