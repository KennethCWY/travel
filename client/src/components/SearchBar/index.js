import React, { useState } from "react";
import "./style.css";

function SearchBar() {
  const [location, setLocation] = useState("");

  function updateInput(e) {
    setLocation(e.target.value);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      window.location = "/flights";
    } catch (err) {
      console.log(err);
    }
    setLocation("");
  }

  return (
    <form aria-label="search-bar" onSubmit={handleSubmit}>
      <input
        id="location"
        type="text"
        placeholder="new york"
        value={location}
        onChange={updateInput}
      />
    </form>
  );
}

export default SearchBar;
