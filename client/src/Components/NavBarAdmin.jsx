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
import { FaBars } from "react-icons/fa";

export const NavBarAdmin = () => {
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
  // useEffect(()=>{
  //   if(!logged){
  //     setLogged(login)
  //   }
  // },[])

  function handleLogOut() {
    dispatch(getLogOut());
  }
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.nav}>
       
          <img className={styles.logo} src={logo} alt="logo" />
       

        <ul className={styles.navMenu}>   
          <li className={styles.navMenuItemLogout}>
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
