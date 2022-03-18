import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DetailsPage from "../Pages/DetailsPage";
import ReviewCard from "./ReviewCard";
import profileDefault from "../assets/profile.jpg";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { Card } from "primereact/card";
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
    <Card
      style={{ maxWidth: "50rem" }}
      className="flex align-items-center justify-content-center surface-500 text-white border-round m-3"
    >
      <div className="flex-column align-items-center justify-content-center  ">
        <img
          style={{ borderRadius: "100px" }}
          className="h-10rem max-w-max"
          src={image}
          alt={`imagen de perfil de ${title}`}
        />
        <div className="">
          <h4 className="">{title}</h4>
          <p className="ml-3 mr-3">{description}</p>
          <p className="">Rating </p>
          <Rating
            className="text-white"
            value={rating}
            readOnly
            stars={5}
            cancel={false}
          />

          <p className="">Contrataciones</p>
          <p className="">{bookings}</p>
          <Button
            className="p-button-rounded p-button-success p-button-lg "
            id="detailsBtn"
            onClick={() => toggleDetails()}
            title="Detalles"
            value="Detalles"
          >
            <FaPlus />
          </Button>
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

          <Link
            className="p-button-rounded p-button-success p-button-text"
            to={{
              pathname: `/DetailsPage?description=${description}&title=${title}&id=${id}&authorId=${authorId}&date=${date}&rating=${rating}&bookings=${bookings}`,
            }}
            id="detailPageBtn"
          >
            <Button
              className="p-button-rounded p-button-success p-button-lg "
              id="detailsBtn"
              title="Detalles"
              value="Detalles"
            >
              Mas info
            </Button>
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
