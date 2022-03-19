import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearch } from '../REDUX/actions/action';

export default function SearchBar() {
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    function handleSearchInput(e){
        setSearch(e.target.value);
    }

    function handleSearch(e){
        e.preventDefault();
        dispatch(getSearch(search))
    }

  return (
    <div>
        <form onSubmit={(e)=> handleSearch(e)}>
        <input type="text" placeholder="Buscar" id="searchInput" onChange={(e)=> handleSearchInput(e)}></input> <input type="submit" value="Buscar"></input>
        </form>
    </div>
  )
}
