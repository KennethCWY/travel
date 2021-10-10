import React from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

const Trip = () => {
  const location = useLocation();
  let header;
  let tripcard;

  if (location.pathname === "/creatortrip") {
    header = "Creator Trip";
    tripcard = "Trip Card Info Here";
  } else if (location.pathname === "/yourtrip") {
    header = "Your Trip";
    tripcard = "Trip Card Info with Reactions Here";
  }

  return (
    <div className="trip-container">
      <h1>{header}</h1>
      <div className="card">
        <div className="card-body">{tripcard}</div>
      </div>
    </div>
  );
};

export default Trip;
