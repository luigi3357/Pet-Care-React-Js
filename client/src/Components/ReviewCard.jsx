import React from "react";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa";
import { Card } from "primereact/card";

export default function ReviewCard({ id, key, rating, message, from }) {
  return (
    <Card key={key} className="m-5">
      <Rating value={rating} readOnly stars={5} cancel={false} />
      <h5>{message}</h5>
    </Card>
  );
}
