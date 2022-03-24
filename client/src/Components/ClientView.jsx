import React from "react";
import { Link } from "react-router-dom";
import { RatingDemo } from "./Review";
import styles from "../Components/createBooking.module.css";
import { NavBar } from "../Components/NavBar";
import Footer from "./Footer/Footer";

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
            {"el cuidador aún no acepta tu solicitud "}
            <Link
              className={styles.nolink}
              to={`/PersonalProfile/${checkout_details.client.id}`}
            >
              volver
            </Link>
          </p>
        );
      case "rejected":
        return (
            <p className={styles.pBookingDetails}>
              {'el cuidador declinó tu solicitud. Se ha cerrado la operacion '}
            <Link className={styles.nolink} to={"/"}>
              volver
            </Link>
            </p>
        );
      case "cancelled":
        return (
            <p className={styles.pBookingDetails}>
              {'Cancelaste la reserva. Se ha cerrado la operación '}
            
            <Link
              className={styles.nolink}
              to={`/PersonalProfile/${checkout_details.client.id}`}
              >
              volver
            </Link>
              </p>
        );
      case "accepted":
        return (
          <button
            className={styles.singleButtonContainerOrder}
            onClick={submit}
          >
            pagar
          </button>
        );

      case "completed":
        return (
          <div>
            <p className={styles.pBookingDetails}>
              {'Esta reserva fue completada '}
              <Link
                  className={styles.nolink}
                  to={`/PersonalProfile/${checkout_details.keeper.id}`}
                  >
                  volver
                </Link>
            </p>
            {!checkout_details.client_review ? (
              <>
                <Link
                  className={styles.nolink}
                  to={`/PersonalProfile/${checkout_details.client.id}`}
                >
                  volver
                </Link>
                <p className={styles.pBookingDetails}>
                  Dejanos tu opinión sobre {checkout_details.keeper.name}
                </p>
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
            <p className={styles.pBookingDetails}>{'Reserva en curso. '}
            <Link
              className={styles.nolink}
              to={`/PersonalProfile/${checkout_details.client.id}`}
              >
              volver
            </Link>
              </p>
        );
    }
  }
  function cancelButton(cancel) {
    return (
      <button
        className={styles.singleButtonContainerCancelOrder}
        onClick={cancel}
      >
        Cancelar
      </button>
    );
  }
  return (
    <div className={styles.clientView}>
      <NavBar />

      <div className={styles.clientView2}>
        <div className={styles.headerD}>
          <h2 className={styles.titulo}>
            detalles de la reserva #{checkout_details.id.slice(24)}
          </h2>
        </div>
        <div className={styles.clientView2}>
          <div className={styles.subcontainer}>
            <h2>Cuidador</h2>
            <Link
              className={styles.nolink}
              to={`/Profile/${checkout_details.keeper.id}`}
            >
              <p className={styles.pBookingDetailsLink}>
                {checkout_details.keeper.name +
                  " " +
                  checkout_details.keeper.last_name}
              </p>
            </Link>
            <p className={styles.pBookingDetails}>
              {"Teléfono " + checkout_details.keeper.phone}
            </p>
          </div>
          <div className={styles.subcontainer}>
            <h2>Dueño</h2>
            <p className={styles.pBookingDetails}>
              {checkout_details.client.name +
                " " +
                checkout_details.client.last_name}
            </p>
            <p className={styles.pBookingDetails}>
              {"Teléfono " + checkout_details.client.phone}
            </p>
          </div>
          <div className={styles.subcontainer}>
            <h2>Entrada</h2>
            <p className={styles.pBookingDetails}>
              {checkout_details.check_in.slice(0, 10)}
            </p>
            <h2>Salida</h2>
            <p className={styles.pBookingDetails}>
              {checkout_details.check_out.slice(0, 10)}
            </p>
          </div>

          <h2>TOTAL ${checkout_details.price}</h2>

          <h2>Comentarios</h2>
          <p className={styles.pBookingDetails}>{checkout_details.comment}</p>
          <br />
          <div className={styles.botonesOrder}>
            {payButton(checkout_details.status, submit)}
            {!status.includes(checkout_details.status) &&
              cancelButton(cancelOrder)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
