import { Card } from "primereact/card";
import { Image } from "primereact/image";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { NavBar } from "../Components/NavBar";
import profileDefault from "./../assets/profile.jpg";
import style from "./global.module.css";

export const DetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { description, title, author, updatedAt, type, size, address, price } =
    location.state;

  useEffect(() => {}, []);

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.subContainer}>
        <div className={style.photoMap}>
          <Card className={style.photoMap}>
            <Image src={profileDefault} alt="Image" width="250" preview />
            <div className={style.map}></div>
          </Card>
        </div>
        <div className={style.data}>
          <Card className={style.data}>
            <h1>{title}</h1>

            <h3>{description}</h3>
            <h3>Fecha: {updatedAt.slice(0, 10)}</h3>

            <h3>Contrataciones: {author.bookings}</h3>

            <h3>Rating: {author.rating}</h3>
          </Card>
        </div>
      </div>
    </div>
  );
};
