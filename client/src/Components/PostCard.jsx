import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DetailsPage from "../Pages/DetailsPage";
import ReviewCard from "./ReviewCard";
import profileDefault from "../assets/profile.jpg";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { Card } from "primereact/card";
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

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  const styles = {
    container: {
      width: "50vw",
      border: "2px solid black",
    },
    profileImg: {
      width: "10vw",
    },
  };

  return (
    <Card className="flex flex-column align-items-center text-center justify-content-center">
      <div className="flex align-items-center text-center justify-content-center">
        <img
          style={styles.profileImg}
          src={author.image ? author.image : profileDefault}
          alt={`imagen de perfil de ${title}`}
        />
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
          <p>Rating </p>
          <Rating value={author.rating} readOnly stars={5} cancel={false} />

          <p>Contrataciones</p>
          <p>{author.bookings}</p>
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
        <div>
          <h5>{description}</h5>
          <div
            style={{
              width: "35vw",
              overflowX: "scroll",
              display: "flex",
              flexDirection: "row",
              WebkitScrollSnapType: "none",
            }}
          >
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

          <Link
            to={`/DetailsPage/${id}`}
            state={post}
            id="detailPageBtn"
          >
            Más detalles
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
