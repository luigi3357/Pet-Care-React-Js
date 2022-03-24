import React from "react";
import { Link } from "react-router-dom";
import { RatingDemo } from "./Review";
import styles from "../Components/createBooking.module.css";
import { NavBar } from "../Components/NavBar";
import Footer from "./Footer/Footer";

export default function KeeperView({
  checkout_details,
  accept,
  complete,
  cancelOrder,
  status,
}) {
  function acceptButton(status, accept) {
    switch (status) {
      case "cancelled":
        return (
          <p className={styles.pBookingDetails}>
            {'el cliente cancelo la solicitud. Se ha cerrado la operacion '}
            <Link
              className={styles.nolink}
              to={`/PersonalProfile/${checkout_details.keeper.id}`}
            >
              volver
            </Link>
          </p>
        );
      case "rejected":
        return (
          <p className={styles.pBookingDetails}>
            {'Rechazaste esta solicitud. Se ha cerrado la operacion '}
            <Link
              className={styles.nolink}
              to={`/PersonalProfile/${checkout_details.keeper.id}`}
            >
              volver
            </Link>
          </p>
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
            {!checkout_details.keeper_review ? (
              <>
                <p className={styles.pBookingDetails}>
                  Dejanos tu opinión sobre {checkout_details.client.name}
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
      case "pending":
        return (
          <div>
            <button
              className={styles.singleButtonContainerOrder}
              onClick={accept}
            >
              aceptar
            </button>
          </div>
        );

      default:
        const salida = new Date(checkout_details.check_out);
        const today = new Date();
        if (checkout_details.status == "accepted") {
          return (
            <div>
              <p className={styles.pBookingDetails}>
                {"El cliente aún no ha confirmado "}
                <Link
                  className={styles.nolink}
                  to={`/PersonalProfile/${checkout_details.keeper.id}`}
                >
                  volver
                </Link>
              </p>
            </div>
          );
        }
        // if(checkout_details.status == 'approved' && salida.getTime()> today.getTime()){
        //   return (
        //     <div>
        //       <p>Reserva en curso</p>
        //       <Link className={styles.nolink} to={"/"}>volver</Link>
        //     </div>
        //   )}
        if (
          checkout_details.status ==
          "approved" /* && salida.getTime()< today.getTime()*/
        ) {
          return (
            <div>
              <Link
                className={[styles.nolink, styles.pBookingDetails].join(' ')}
                to={`/PersonalProfile/${checkout_details.keeper.id}`}
              >
                volver
              </Link>
              <button
                className={styles.singleButtonContainerOrder}
                onClick={complete}
              >
                Completada
              </button>
            </div>
          );
        }
    }
  }
  function cancelButton(status, cancel) {
    switch (status) {
      case "pending":
        return (
          <button
            className={styles.singleButtonContainerCancelOrder}
            onClick={cancel}
          >
            Cancelar
          </button>
        );

      default:
        return null;
    }
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
            <p className={styles.pBookingDetails}>
              {checkout_details.keeper.name +
                " " +
                checkout_details.keeper.last_name}
            </p>
            <p className={styles.pBookingDetails}>
              {"Teléfono " + checkout_details.keeper.phone}
            </p>
          </div>
          <div className={styles.subcontainer}>
            <h2>Dueño</h2>
            <Link
              to={`/Profile/${checkout_details.client.id}`}
              className={styles.nolink}
            >
              <p className={styles.pBookingDetailsLink}>
                {`${checkout_details.client.name} ${checkout_details.client.last_name}`}
              </p>
            </Link>
            <p className={styles.pBookingDetails}>
              {"Teléfono " + checkout_details.client.phone}
            </p>
          </div>
          <div className={styles.subcontainer}>
            <h2>entrada</h2>
            <p className={styles.pBookingDetails}>
              {checkout_details.check_in.slice(0, 10)}
            </p>
            <h2>Salida</h2>
            <p className={styles.pBookingDetails}>
              {checkout_details.check_out.slice(0, 10)}
            </p>
          </div>

          <h2>TOTAL</h2>
          <h2>${checkout_details.price}</h2>

          <h2>Comentarios</h2>
          <h2>{checkout_details.comment}</h2>
          <div className={styles.botonesOrder}>
            <br />
            {acceptButton(checkout_details.status, accept)}
            {!status.includes(checkout_details.status) &&
              cancelButton(checkout_details.status, cancelOrder)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
