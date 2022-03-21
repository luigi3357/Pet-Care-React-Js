import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import profileDefault from "../assets/profile.jpg";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";

import { FaDog, FaCrow, FaCat } from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";

import style from "./../Pages/global.module.css";
// import { DeletePost } from "./Botones/DeletePost";
export default function PostCard({ post }) {
  const {
    id,
    authorId,
    updatedAt,
    title,
    author,
    description,
    type,
    size,
    address,
    price,
  } = post;
  const [showDetails, setShowDetails] = useState(false);
  let petIcon;
  let sizeText;

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
    <div className={style.postCardContainer}>
      {/* <Fav id = {id} /> */}
      <div className={style.postCardSubContainer}>
      {/* <DeletePost id={id}/> */}

        <img
          className={style.imgPerfil}
          src={author.profileImgURL ? author.profileImgURL : profileDefault}
          alt={`imagen de perfil de ${title}`}
        />
        <div>
          <h4 className="capitalize">{`${author.name} ${author.last_name}`}</h4>

          <div className={style.ratingCont}>
            <div>
              <p className={style.title}>Rating </p>
              <Rating
                className="text-white"
                value={author.rating}
                readOnly
                stars={5}
                cancel={false}
              />
            </div>
            <div>
              <p className={style.title}>Contrataciones</p>
              <p className={style.title}>{author.bookings}</p>
            </div>
          </div>
          <div className={style.ratingCont}>
            <p cla>{petIcon}</p>
            <div>
              <p className="capitalize">{size}</p>
              <p>{sizeText}</p>
            </div>
          </div>
          <Link
            to={`/Profile/${author.id}`}
            state={post}
            className={style.link}
            id="Profile"
          >
            <Button
              className="p-button-rounded p-button-success p-button-lg mb-3"
              id="detailsBtn"
              title="Detalles"
              value="Detalles"
            >
              Mas info
            </Button>
          </Link>
      
        </div>
      </div>
    </div>
  );
}