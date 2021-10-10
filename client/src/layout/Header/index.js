import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <NavLink exact to="/" className="navbar-brand">
        Oyster Card
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/flights" className=" nav-item nav-link">
            Flights
          </NavLink>

          <NavLink to="/accommodation" className="nav-item nav-link">
            Accommodation
          </NavLink>

          <NavLink to="/experiences" className="nav-item nav-link">
            Experiences
          </NavLink>

          <NavLink to="/login" className="nav-item nav-link">
            Login
          </NavLink>

          <NavLink to="/register" className="nav-item nav-link">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
