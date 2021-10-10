import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const NotFound = () => {
  return (
    <div className="message" aria-label="notfound">
      <h3>Oops! Looks like this page does not exist!</h3>
      <p>
        <NavLink exact to="/">
          Click here to return home
        </NavLink>
      </p>
    </div>
  );
};

export default NotFound;
