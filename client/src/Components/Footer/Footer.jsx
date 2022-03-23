import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logoPetCare.svg";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <img className={styles.footerImg} src={logo} alt="" />
      <div className={styles.footerContainerIcons}>
        <FaInstagram className="text-3xl " color="#2D333B" />
        <FaFacebook className="text-3xl" color="#2D333B" />
        <AiFillGithub className="text-3xl" color="#2D333B" />
      </div>
      <p className={styles.copy}>Copyright © 2022 ForeverCarpinchos </p>
    </div>
  );
}
