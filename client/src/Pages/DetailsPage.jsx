import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Card } from "primereact/card";
import queryString from "query-string";
import style from "./global.module.css";
import { NavBar } from "../Components/NavBar";
import { Image } from "primereact/image";
import profileDefault from "./../assets/profile.jpg";

export const DetailsPage = () => {
  const { search } = useLocation();
  const { id, authorId, description, title, rating, bookings, date } =
    queryString.parse(search);

  useEffect(() => {
    console.log("description:", queryString.parse(search));
  }, []);
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
            <h3>Fecha: {date}</h3>

            <h3>Contrataciones: {bookings}</h3>

            <h3>Rating: {rating}</h3>
          </Card>
        </div>
      </div>
    </div>
  );
};
