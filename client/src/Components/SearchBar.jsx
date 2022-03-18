import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    // redux;
  }

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          placeholder="Buscar"
          id="searchInput"
          onChange={(e) => handleSearchInput(e)}
        ></input>{" "}
        <input type="submit" value="Buscar"></input>
      </form>
    </div>
  );
}
