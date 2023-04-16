import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";

function SharedLoggedOutLayout() {
  return (
    <div>
      <nav className="nav-container">
        <button type="logged-out">
          <Link to="/"> HOME </Link>
        </button>

        {/* <button className="ownerSignUp">
          <Link to="/OwnerForm">OWNER Form</Link>
        </button> */}

        <button className="ownerCreateAccount">
          <Link to="/ownerCreateAccount">OWNER Sign Up</Link>
        </button>
        <button className="CustomerCreateAccount">
          <Link to="/CustomerCreateAccount">Customer Sign Up</Link>
        </button>
        {/* <button className="logout">
          <Link to="/">LOGOUT</Link>
        </button> */}

        {/* <button className="customerForm">
          <Link to="/CustomerForm">CUSTOMER Form</Link>
        </button> */}

        {/* <button className="ownerLogin">
          <Link to="/OwnerLogin">OWNER LOG-IN</Link>
        </button>

        <button className="customerLogin">
          <Link to="/CustomerLogin">CUSTOMER LOG-IN</Link>
        </button> */}

        {/* <button className="customerDash">
          <Link to="/CustomerDashboard">Customer Dash</Link>
        </button> */}
      </nav>
      <Outlet className="page" />
    </div>
  );
}

export default SharedLoggedOutLayout;
