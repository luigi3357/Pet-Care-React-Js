import React from "react";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { Card } from "primereact/card";
import "../Pages/stylesProfileTerceros.css"
export default function ReviewCard({ id, key, rating, message, from }) {
  return (
    <div key={key} className="cardComentariosContainer">
      <Rating value={rating} readOnly stars={5} cancel={false} />
      <h5>{message}</h5>
    </div>
  );
}
