import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearch } from '../REDUX/actions/action';

export default function SearchBar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
// useEffect(()=>{
//   if(search>0){
//     setTimeout(() => {
//       dispatch(getSearch(search))
//     }, 3500); 
//   }    
// },[dispatch])

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
