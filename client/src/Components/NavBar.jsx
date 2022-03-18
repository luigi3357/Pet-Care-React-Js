import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import style from "./../Pages/global.module.css";

export const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
      <Link className={style.link} to="/">
        <Button
          label="Home"
          icon="pi pi-fw pi-home"
          className="p-button-sm p-button-rounded p-button-info p-button-outlined"
        />
      </Link>

      <Link className={style.link} to="/Register">
        <Button
          label="Registrarse"
          className="p-button-sm p-button-info p-button-rounded"
        />
      </Link>

      <Link className={style.link} to="/Login">
        <Button
          label="Iniciar Sesion"
          className="p-button-sm p-button-secondary p-button-rounded"
        />
      </Link>

      <Avatar label="J" shape="circle" size="large" />

      <p className={style.navBarName}>Hola, Julio!</p>
    </div>
  );
};
