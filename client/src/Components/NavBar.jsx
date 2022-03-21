import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import style from "./../Pages/global.module.css";
import logo from "./../assets/logoPetCare.svg";
import { getLogOut } from "../REDUX/actions/action";
import { AiOutlineLogout } from "react-icons/ai";

export const NavBar = () => {
  const dispatch = useDispatch();
  let login = useSelector((state) => state.login);

  console.log("soy login", login.name);

  function handleLogOut() {
    dispatch(getLogOut());
  }

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

        {login.name ? null : (
          <Link className={style.link} to="/Register">
            <Button
              label="Registrarse"
              className="p-button-sm p-button-info p-button-rounded"
            />
          </Link>
        )}

        {login.name ? null : (
          <Link className={style.link} to="/Login">
            <Button
              label="Iniciar Sesion"
              className="p-button-sm p-button-secondary p-button-rounded"
            />
          </Link>
        )}

        {login.name ? (
          <Avatar
            label={login.name[0].toUpperCase()}
            shape="circle"
            size="large"
          />
        ) : null}

        {login.name ? (
          <p className={style.navBarName}>Hola, {login.name}!</p>
        ) : null}

        {login.name ? (
          <Link
            onClick={(e) => {
              handleLogOut();
            }}
            className={style.link}
            to="/Login"
          >
            <AiOutlineLogout className="text-2xl" color="red" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};
