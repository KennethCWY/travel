import React from "react";
import { ExploreImages, SearchBar } from "../../components";
import "./style.css";

const Explore = () => {
  return (
    <div>
      <SearchBar />
      <h2>Discover upcoming flights</h2>
      <ExploreImages />
    </div>
  );
};

export default Explore;
