import { Image } from "primereact/image";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { NavBar } from "../Components/NavBar";
import profileDefault from "./../assets/profile.jpg";
import style from "./global.module.css";
import ReviewCard from "../Components/ReviewCard";
import { Rating } from "primereact/rating";
import { FaDog, FaCrow, FaCat } from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";
import { Button } from "primereact/button";
import { CreateBooking } from "../Components/CreateBooking";
import MapDetail from "./MapDetail";
import { useSelector } from "react-redux";
import axios from "axios";
import { localhost } from "../REDUX/actions/action";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

export const PersonalProfile = () => {
  const { id } = useParams(); // recibo el id por params para buscar la info con la ruta /users/profile/id

  const location = useLocation();

  const loginUser = useSelector((state) => state.login); // obtengo la info del estado login para saber si entro a un perfil estando logeado o no. se usa para botones de reserva y para saber si el logeado esta viendo su perfil, para renderizar los botones de editar perfil y seguridad

  const [logged, setLogged] = useState(null); // estado local para guardar la info del logeado (usado para el localstorage)

  const [fullInfo, setfullInfo] = useState(); // el estado para guardar toda la info del id con el que se entro al perfil

  useEffect(() => {
    const logStorage = window.localStorage.getItem("login");
    if (logStorage) {
      const loggedStorage = JSON.parse(logStorage);
      setLogged(loggedStorage);
    }
  }, [loginUser]);

  let petIcon;
  let sizeText;

  useEffect(() => {
    axios
      .get(`${localhost}/users/profile/` + id)
      .then((r) => setfullInfo(r.data));
  }, [id]);

  switch (fullInfo ? fullInfo.type : null) {
    case "gato":
      petIcon = <FaCat className="text-5xl" />;
      break;
    case "perro":
      petIcon = <FaDog className="text-6xl" />;
      break;
    case "roedores":
      petIcon = <MdPestControlRodent className="text-6xl" />;
      break;
    case "aves":
      petIcon = <FaCrow className="text-6xl" />;
      break;
    default:
      break;
  }

  switch (fullInfo ? fullInfo.size : null) {
    case "pequeño":
      sizeText = "0 a 25cm";
      break;
    case "mediano":
      sizeText = "25 a 60cm";
      break;
    case "grande":
      sizeText = "60 a 120cm";
      break;
    default:
      break;
  }

  console.log("soyfullInfo", fullInfo);
  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.subContainer}>
        <div className={style.photoMap}>
          <div className={style.photoMap}>
            <Image
              src={
                fullInfo
                  ? fullInfo.profileImgURL
                    ? fullInfo.profileImgURL
                    : profileDefault
                  : profileDefault
              }
              alt="Image"
              width="200"
              height="200"
              preview
            />
            <div className={style.map}>
              <Link to={`/editProfile`} className={style.link}>
                <Button
                  label="Editar perfil"
                  className="p-button-sm p-button-info p-button-rounded"
                />
              </Link>
              <Button
                label="Verificacion en 2 pasos"
                className="p-button-sm p-button-warning p-button-rounded"
              />
              <Button
                label="Cambiar contraseña"
                className="p-button-sm p-button-warning p-button-rounded"
              />

              <Link to={`/formpublic`} className={style.link}>
                <Button
                  label="Crear post"
                  className="p-button-sm p-button-warning p-button-rounded"
                />
              </Link>

              <Link to={`/editProfile`} className={style.link}>
                <Button
                  label="asd"
                  className="p-button-sm p-button-warning p-button-rounded"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={style.profileCardContainer}>
          <div className={style.data}>
            <div className={style.subData}>
              <h3>{fullInfo ? fullInfo.title : null}</h3>
              <p className={style.description}>
                {fullInfo ? fullInfo.bio : null}
              </p>
              {/* <p>Fecha: {updatedAt.slice(0, 10)}</p> */}
              <p>Contrataciones: {fullInfo ? fullInfo.bookings : null}</p>
              <p>Rating:</p>
              <Rating
                className="text-white"
                value={fullInfo ? fullInfo.rating : null}
                readOnly
                stars={5}
                cancel={false}
              />
              {/* <p>Precio: ${price}</p> */}
              <p>Direccion: {fullInfo ? fullInfo.address : null}</p>
              <p>Tipo:</p> {petIcon}
              <p>Tamaño:</p> {sizeText}
            </div>
          </div>
          <h4>Posteos</h4>
          {fullInfo
            ? fullInfo.posteos.map((p) => {
                return (
                  <Card>
                    <p>Descripcion: {p.description}</p>
                    <p>Price: $ {p.price}</p>

                    <p>Tamaño: {p.size}</p>
                    <p>Tipo: {p.type}</p>
                  </Card>
                );
              })
            : null}

          <h4>Comentarios</h4>
          {fullInfo ? (
            fullInfo.reviews?.map((i) => {
              return (
                <div>
                  <ReviewCard
                    id={i.id}
                    key={i.id}
                    rating={i.rate}
                    message={i.message}
                  />
                </div>
              );
            })
          ) : (
            <h5>El usuario aún no posee reviews</h5>
          )}
        </div>
      </div>
    </div>
  );
};
