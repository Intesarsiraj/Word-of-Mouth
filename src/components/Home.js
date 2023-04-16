import React from "react";
import { Link } from "react-router-dom";
import CustomerLogin from "./CustomerLogin";
import "./Home.css";
import "../App.css";
import OwnerLogin from "./OwnerLogin";

function Home() {
  return (
    <div className="page">
      {/* <nav>
        <button className="home">
          <Link to="/"> HOME </Link>
        </button>

        <button className="ownerSignUp">
          <Link to="/OwnerForm">OWNER SIGN-UP</Link>
        </button>

        <button className="ownerCreateAccount">
          <Link to="/ownerCreateAccount">OWNER Create Account</Link>
        </button>
        <button className="CustomerCreateAccount">
          <Link to="/CustomerCreateAccount">Customer Create Account</Link>
        </button>

        <button className="customerSignUp">
          <Link to="/CustomerForm">CUSTOMER SIGN-IN</Link>
        </button>

        <button className="ownerLogin">
          <Link to="/OwnerLogin">OWNER LOG-IN</Link>
        </button>

        <button className="customerLogin">
          <Link to="/CustomerLogin">CUSTOMER LOG-IN</Link>
        </button>

        <button className="customerDash">
          <Link to="CustomerDashboard">Customer Dash</Link>
        </button>
      </nav> */}
      <h2 className="welcome">Welcome to Word of Mouth.</h2>
      <p>
        Are you ready to explore what new WOM businesses you can support? Go
        ahead and Sign-Up to start exploring what local, small service providers
        are near you
      </p>
      <div id="owner-login" class="contactTile">
        <OwnerLogin></OwnerLogin>
      </div>

      <div id="customer-login" className="contactTile">
        <CustomerLogin></CustomerLogin>
      </div>
    </div>
  );
}

export default Home;
