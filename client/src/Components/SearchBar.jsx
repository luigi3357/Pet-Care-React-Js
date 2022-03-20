import React, { useState } from 'react';
//import { useDispatch } from 'react-redux';
import { getSearch } from '../REDUX/actions/action';

//import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
export default function SearchBar() {
  const dispatch = useDispatch();

    //const [search, setSearch] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(e) {
    setSearch(e.target.value);
  }

    function handleSearch(e){
        e.preventDefault();
        dispatch(getSearch(search))
    }

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e)} className="p-input-icon-right">
        <i className="pi pi-search" />
        <InputText
          type="text"
          id="searchInput"
          placeholder="Buscar..."
          onChange={(e) => handleSearchInput(e)}
        />
      </form>
    </div>
  );
}
