import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router";

function SearchBar() {
  const [location, setLocation] = useState("");
  const history = useHistory();

  function updateInput(e) {
    setLocation(e.target.value);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      history.push("/flights");
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
