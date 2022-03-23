import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import { RatingDemo } from "./Review";
import styles from'../Components/createBooking.module.css';
import { NavBar } from "../Components/NavBar";



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
          <p className={styles.pBookingDetails}>
            el cuidador aun no acepta tu solicitud
            <Link to={"/"}>volver</Link>
          </p>
        );
      case "rejected":
        return (
          <div>
            <p className={styles.pBookingDetails}>el cuidador declinó tu solicitud</p>
            <p className={styles.pBookingDetails}>Se ha cerrado la operacion</p>
            <Link to={"/"}>volver</Link>
          </div>
        );
      case "cancelled":
        return (
          <div>
            <p className={styles.pBookingDetails}>Cancelaste la reserva</p>
            <p className={styles.pBookingDetails}>Se ha cerrado la operacion</p>
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
            <p className={styles.pBookingDetails}>Esta reserva fue completada</p>
            {!checkout_details.client_review ? (
              <>
                <Link to={"/"}>volver</Link>
                <p className={styles.pBookingDetails}>Dejanos tu opinión sobre {checkout_details.keeper.name}</p>
                <RatingDemo
                  client_id={checkout_details.client_id}
                  keeper_id={checkout_details.keeper_id}
                  booking_id={checkout_details.id}
                />
              </>
            ) : null}
          </div>
        );

      default:
        return (
          <div>
            <p className={styles.pBookingDetails}>Reserva en curso</p>
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
    <div className={styles.clientView}>
      <NavBar />

      <div className={styles.clientView2}>

      <h1>#{checkout_details.id.slice(24)}</h1>
        <h2>Cuidador</h2>
        <Link to={`/Profile/${checkout_details.keeper.id}`}>
          <p className={styles.pBookingDetails}>
            {checkout_details.keeper.name.toUpperCase() +
              " " +
              checkout_details.keeper.last_name.toUpperCase()}
          </p>
        </Link>
        <p className={styles.pBookingDetails}>{checkout_details.keeper.phone} </p>
        <div className={styles.poneleNombre}>

        <h2>Dueño</h2>
        <p className={styles.pBookingDetails}>
          {checkout_details.client.name.toUpperCase() +
            " " +
            checkout_details.client.last_name.toUpperCase()}
        </p>
            </div>
        <p className={styles.pBookingDetails}>{checkout_details.client.phone} </p>
        <h2>Registro</h2>
        <p className={styles.pBookingDetails}>{checkout_details.check_in.slice(0, 10)}</p>
        <h2>Salida</h2>
        <p className={styles.pBookingDetails}>{checkout_details.check_out.slice(0, 10)}</p>

        <h2>TOTAL</h2>
        <h2>${checkout_details.price}</h2>

        <h2>{checkout_details.comment}</h2>
        <p className={styles.pBookingDetails}>{checkout_details.comment}</p>
        {payButton(checkout_details.status, submit)}
        {!status.includes(checkout_details.status) && cancelButton(cancelOrder)}
      </div>
    </div>
  );
}
