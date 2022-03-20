import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import style from "./../Pages/global.module.css";
import logo from "./../assets/logoPetCare.svg";

export const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
      <Image src={logo} alt="Image Text" imageStyle={{ width: " 50px" }} />

      <div className={style.navBarSubContainer}>
        <Link className={style.link} to="/">
          <Button
            label="Inicio"
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

        <Link className={style.link} to="/Login">
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger "
          />
        </Link>
      </div>
    </div>
  );
};
