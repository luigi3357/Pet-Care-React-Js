import React from "react";
import { Link } from "react-router-dom";
import profileDefault from "../assets/profile.jpg";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FaDog, FaCrow, FaCat } from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";
import style from "./../Pages/global.module.css";
import { useSelector } from "react-redux";
// import { DeletePost } from "./Botones/DeletePost";

export default function PostCard({ post }) {
  const { title, author, type, size } = post;
  // const loggedUser = JSON.parse(localStorage.login);
  const loggedUser = useSelector((state) => state.login) 
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
  function ratingCalculation() {
    let lowerInt = Math.floor(author.rating);
    let diffRating = author.rating - lowerInt;
    if (diffRating < 0.75) {
      return lowerInt;
    }
    return Math.ceil(author.rating);
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
        <div className={style.titlecards}>
          <h4 className="capitalize">{`${author.name} ${author.last_name}`}</h4>

          <div className={style.ratingCont}>
            <div>
              <h4 className={style.titlecards}>Calificación: </h4>
            </div>
            <div className={style.ratingrat}>
              <Rating
                className="text-white"
                value={ratingCalculation()}
                readOnly
                stars={5}
                cancel={false}
              />
            </div>
          </div>
          <div className={style.petsize}>
            <p className={style.peticon}>{petIcon}</p>
            <div className={style.petsizecont}>
              <h4 className="capitalize">{size}</h4>
              <h5 className={style.sizeTxt}>(De {sizeText})</h5>
            </div>
          </div>
          <div className={style.contratacionn}>
            <h4 className={style.titlecards}>Contrataciones:</h4>
            <h4 className={style.titlecards}>{author.bookings}</h4>
          </div>
          <div>
            <h5>Desde ARS${post.price}</h5>
          </div>
          {loggedUser ? (
            <Link
              to={
                loggedUser.id !== author.id
                  ? `/Profile/${author.id}`
                  : `/PersonalProfile/${loggedUser.id}`
              }
              state={post}
              className={style.link}
              id="Profile"
            >
              <button className={style.singleButtonContainer}>Mas info</button>
            </Link>
          ) : (
            <Link
              to={`/Profile/${author.id}`}
              state={post}
              className={style.link}
              id="Profile"
            >
              <button className={style.singleButtonContainer}>Mas info</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
