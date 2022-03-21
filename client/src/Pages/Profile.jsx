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
import {CreateBooking} from '../Components/CreateBooking'
import MapDetail from "./MapDetail";
import { useSelector } from "react-redux";
import axios from "axios";
import { localhost } from "../REDUX/actions/action";
export const Profile = (post) => {
  const { id } = useParams();
  const location = useLocation();
  const { description, title, author, updatedAt, type, size, address, price } = location.state;
  const loginUser = useSelector (state=>state.login)
  const [fullInfo,setfullInfo]= useState(null);
  console.log(fullInfo, 'APENAS RENDERIZA')
  let petIcon;
  let sizeText;
  useEffect(async ()=>{ 
    await axios.get(`${localhost}/users/profile/`+ author.id).then((response)=>setfullInfo(response.data))
 },[])
  switch (type) {
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

  switch (size) {
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

  return (
    <div className={style.container}>
      <NavBar />
      <div className={style.subContainer}>
        <div className={style.photoMap}>
          <div className={style.photoMap}>
            <Image src={profileDefault} alt="Image" width="250" preview />
            <div className={style.map}></div>
          </div>
        </div>
        <div className={style.profileCardContainer}>
          <div className={style.data}>
            <div className={style.subData}>
              <h3>{title}</h3>
              <p className={style.description}>{description}</p>
              <p>Fecha: {updatedAt.slice(0, 10)}</p>
              <p>Contrataciones: {author.bookings}</p>
              <p>Rating:</p>
              <Rating
                className="text-white"
                value={author.rating}
                readOnly
                stars={5}
                cancel={false}
              />
              <p>Precio: ${price}</p>
             {fullInfo&& <CreateBooking keeper={author} price={price} client={loginUser ? loginUser: null} info={fullInfo} />}
              <p>Direccion: {address}</p>
              <p>Tipo:</p> {petIcon}
              <p>Tamaño:</p> {sizeText}
            </div>
          </div>
          <h4>Comentarios</h4>
          {author.reviews ? (
            author.reviews.map((i) => {
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
