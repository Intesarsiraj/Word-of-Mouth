import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./LoggedInNav.css";
import useAuth from "../hooks/useAuth";

function SharedOwnerLayout() {
  const { anyUser } = useAuth();
  return (
    <div className="sharedCustLayout">
      <nav className="sharedNav">
        <button className="home">
          <Link to="/"> HOME </Link>
        </button>

        <button className="owner-dash">
          <Link to="/owner/dash">DASH</Link>
        </button>

        <button className="messages">
          <Link to="/owner/messaging">MESSAGES</Link>
        </button>

        <button className="logout">
          <Link to="/">LOGOUT</Link>
        </button>
      </nav>
      {/* <h2>Logged in as: {anyUser.email}</h2> */}
      <Outlet />
    </div>
  );
}

export default SharedOwnerLayout;
