import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addFavoritos } from "../../REDUX/actions/action";


export default function Fav({ id }) {
  const users = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const favoritosAnteriores = !users.favoritos? []: users.favoritos;
  const array = [];
  const favoritos = array.push(id);
  const data1 = {
    email: users.email,
    favoritos: favoritos
  }
  const handleLogin = () => {
    dispatch(addFavoritos(data1));
  };

  return (
    <>
      <button onClick={(a) => handleLogin(a)}>
        <span>
          {"<3"}
        </span>
      </button>
     
    </>
  );
}
