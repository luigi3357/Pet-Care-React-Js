import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import style from "./../Pages/global.module.css";
import styles from "../Components/NavBar.module.css";
import logo from "./../assets/logoPetCareBlanco.svg";
import { getLogOut } from "../REDUX/actions/action";
import { AiOutlineLogout } from "react-icons/ai";
import {FaBars} from "react-icons/fa"

export const NavBar = () => {
  const dispatch = useDispatch();
  let login = useSelector((state) => state.login);
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    const logStorage = window.localStorage.getItem("login");

    if (logStorage) {
      const loggedStorage = JSON.parse(logStorage);
      setLogged(loggedStorage);
    }
  }, [login]);
  console.log("soy login", logged);
  // useEffect(()=>{
  //   if(!logged){
  //     setLogged(login)
  //   }
  // },[])

  function handleLogOut() {
    dispatch(getLogOut());
  }
console.log(logged,"algo")
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.nav}>
        <Link to="/">
          <Image className={styles.logo} src={logo} alt="Image Text" imageStyle={{ width: " 60px" }} />
        </Link>
        <button className={styles.navHam}>
          <FaBars/>
        </button>
        <ul className={styles.navMenu}>
          <li className={styles.navMenuItem}>
            <Link className={style.link} to="/">
              <Button
                label="Inicio"
                icon="pi pi-fw pi-home"
                className="p-button-sm p-button-rounded p-button-info p-button-outlined"
              />
            </Link>
          </li>
          <li className={styles.navMenuItem}>
            {logged ? null : (
              <Link className={style.link} to="/Register">
                <Button
                  label="Registrarse"
                  className="p-button-sm p-button-info p-button-rounded"
                />
              </Link>
            )}
          </li>
          <li className={styles.navMenuItem}>
          {logged ? null : (
            <Link className={style.link} to="/Login">
              <Button
                label="Iniciar Sesion"
                className="p-button-sm p-button-secondary p-button-rounded"
              />
            </Link>
          )}
          </li>
          <li className={styles.navMenuItem}>
            {logged ? (
              <Link
                to={`/PersonalProfile/${logged.id}`}
                state={logged}
                className={style.link}
                id="Profile"
              >
                <Avatar
                  className={styles.navMenuItemAvatar}
                  label={logged.name[0].toUpperCase()}
                  shape="circle"
                  size="large"
                />
              </Link>
            ) : null}
          </li>
          <li className={styles.navMenuItem}>
            {logged ? (
              <p className={styles.name}>Hola, {logged.name}!</p>
            ) : null}
          </li>
          <li className={styles.navMenuItemLogout}>
            {console.log(logged)}
            {logged ? (
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
          </li>
        </ul>
      </div>
    </div>
  );
};
