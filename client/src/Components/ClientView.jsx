import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import { RatingDemo } from "./Review";

export default function ClientView({
  checkout_details,
  submit,
  cancelOrder,
  status,
}) {
  function payButton(status, submit) {
    switch (status) {
      case "pending":
        return (
          <p>
            el cuidador aun no acepta tu solicitud
            <Link to={"/"}>volver</Link>
          </p>
        );
      case "rejected":
        return (
          <div>
            <p>el cuidador declinó tu solicitud</p>
            <p>Se ha cerrado la operacion</p>
            <Link to={"/"}>volver</Link>
          </div>
        );
      case "cancelled":
        return (
          <div>
            <p>Cancelaste la reserva</p>
            <p>Se ha cerrado la operacion</p>
            <Link to={"/"}>volver</Link>
          </div>
        );
      case "accepted":
        return (
          <Button
            label={"Pagar"}
            className="p-button-rounded p-button-success p-button-raised"
            onClick={submit}
          />
        );
  
      case "completed":
        return (
          <div>
          
          <p>Esta reserva fue completada</p>
          {
            !checkout_details.client_review ?
            <>
            <Link to={"/"}>volver</Link>
          <p >Dejanos tu opinión sobre {checkout_details.keeper.name}</p>
          <RatingDemo  client_id={checkout_details.client_id} keeper_id={checkout_details.keeper_id} booking_id={checkout_details.id}  />
            </>
          :null}
        </div>
      );
  
      default:
        return (
          <div>
            <p>Reserva en curso</p>
            <Link to={"/"}>volver</Link>
          </div>
        );
    }
  }
  function cancelButton(cancel) {
    return (
      <Button
        label={"Cancelar"}
        className="p-button-rounded p-button-danger p-button-raised"
        onClick={cancel}
      />
    );
  }
  return (
    <div>
      <h1>#{checkout_details.id.slice(24)}</h1>
      <div>
        <h2>Cuidador</h2>
        <p>
          {checkout_details.keeper.name +
            " " +
            checkout_details.keeper.last_name}
        </p>
        <p>{checkout_details.keeper.phone} </p>
        <h2>Dueño</h2>
        <p>
          {checkout_details.client.name +
            " " +
            checkout_details.client.last_name}
        </p>
        <p>{checkout_details.client.phone} </p>
        <h2>Registro</h2>
        <p>{checkout_details.check_in.slice(0,10)}</p>
        <h2>Salida</h2>
        <p>{checkout_details.check_out.slice(0,10)}</p>

        <h2>TOTAL</h2>
        <h2>${checkout_details.price}</h2>

        <h2>{checkout_details.comment}</h2>
        {payButton(checkout_details.status, submit)}
        {!status.includes(checkout_details.status) && cancelButton(cancelOrder)}
      </div>
    </div>
  );
}

