import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DetailsPage from "../Pages/DetailsPage";
import ReviewCard from "./ReviewCard";
import profileDefault from "../assets/profile.jpg";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { Card } from "primereact/card";
import style from "./../Pages/global.module.css";

export default function PostCard({
  id,
  authorId,
  date,
  title,
  image = profileDefault,
  rating,
  bookings,
  description,
  reviews,
}) {
  const [showDetails, setShowDetails] = useState(false);
  console.log(title);
  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <div className={style.postCardContainer}>
      <div className={style.postCardSubContainer}>
        <img
          className={style.imgPerfil}
          src={image}
          alt={`imagen de perfil de ${title}`}
        />
        <div>
          <h4 className="">{title}</h4>
          <p className={style.description}>{description}</p>

          <div className={style.ratingCont}>
            <div>
              <p className={style.title}>Rating </p>
              <Rating
                className="text-white"
                value={rating}
                readOnly
                stars={5}
                cancel={false}
              />
            </div>
            <div>
              <p className={style.title}>Contrataciones</p>
              <p className={style.title}>{bookings}</p>
            </div>
          </div>

          <Link
            className={style.link}
            to={{
              pathname: `/DetailsPage?description=${description}&title=${title}&id=${id}&authorId=${authorId}&date=${date}&rating=${rating}&bookings=${bookings}`,
            }}
            id="detailPageBtn"
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

      {/* Detalles */}
      {showDetails ? (
        <div className="">
          <div>
            {reviews ? (
              reviews.map((i) => {
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
      ) : null}
    </div>
  );
}
