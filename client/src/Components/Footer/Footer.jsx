import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logoPetCare.svg";
import facebook_logo from "../../assets/facebook_logo.png";
import instagram_logo from "../../assets/instagram_logo.png";
import twitter_logo from "../../assets/twitter_logo.png";
import linkedin_logo from "../../assets/linkedin_logo.png";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div >
              <img src={logo} width="100px" alt="" />
            </div>
            <div className={styles.social}>
            <a href="https://www.facebook.com/" target="_blank">
              <img src={facebook_logo} width="30px" alt="" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src={instagram_logo} width="30px" alt="" />
            </a>
            <a href="https://www.twitter.com/" target="_blank">
              <img src={twitter_logo} width="30px" alt="" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <img src={linkedin_logo} width="30px" alt="" />
            </a>
            </div>
          </div>
          
          <div className={styles.column}>
            <span className={styles.titles}>Nosotros</span>
            <br />
            <Link to="/about">
            <span className={styles.text}>PetCare</span>
            </Link>
            <br />
            <Link to="/terms">
            <span className={styles.text}>Términos y condiciones</span>
            </Link>
            <br />
          </div>
          <div className={styles.column}>
            <span className={styles.titles}>Navegar</span>
            <br />
            <Link to="/register">
            <span >Registrarme</span>
            </Link>
            <br />
            <Link to="/">
            <span className={styles.text}>Destacados</span>
            </Link>
            <br />
            <Link to="/Maps">
            <span className={styles.text}>Mapa</span>
            </Link>
            <br />
            <Link to="/faq">
            <span className={styles.text}>Preguntas frecuentes</span>
            </Link>
            <br />
          </div>
          <div className={styles.column}>
            <span className={styles.titles}>Escribenos</span>
            <br />
            <span className={styles.text}>Whatsapp: +54 11 1111-1111</span>
            <br />
            <span className={styles.text}>Email: petcare3456789@gmail.com</span>
          </div>
        </div>
              </div>
        <div className={styles.legalito}>
          <div className={styles.legal}>
            Copyright © 2022 PetCare | All rights reserved
          </div>
        </div>
      </div>
  );
}
