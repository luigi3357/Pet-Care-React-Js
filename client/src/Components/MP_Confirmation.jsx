import axios from "axios";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localhost } from "../REDUX/actions/action";
import styles from "../Components/createBooking.module.css";
import { NavBar } from "./NavBar";
import Footer from "./Footer/Footer";

function loader() {
  return (
      <h1>ESTAMOS CONFIRMANDO EL PAGO...</h1>
  );
}

export function ConfirmationMP() {
  const [loading, setLoading] = useState(true);
  const [serverCheck, setServerCheck] = useState(false);
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  let params = new URL(document.location).searchParams;
  const bookingID = params.get("external_reference");
  const status = params.get("status");
  const preferenceID = params.get("preference_id");
  const paymentID = params.get("payment_id");
  const logged = JSON.parse(localStorage.login);
  useEffect(async () => {
    await axios
      .put(`${localhost}/bookings/payment_check`, {
        preference_id: preferenceID,
        status: status,
        id: bookingID,
        payment_id: paymentID,
      })
      .then((response) => {
        if (response.data == "ok") {
          setServerCheck(true);
        }
      });
    await axios
      .get(`${localhost}/bookings/details?id=${bookingID}`)
      .then((response) => {
        setDetails(response.data);
      });

    setLoading(false);
    setTimeout(() => {
      navigate(`/PersonalProfile/${logged.id}`);
    }, 2000);
  }, []);

  return (
    <div className={styles.ConfirmationMP}>
      <NavBar />

      {/* {(!loading)&& <p>hubo un problema con el pago</p>} */}
      {loading ? (
        loader()
      ) : (
        <div className={styles.redirect}>
          {serverCheck ? <h1>Pago Aprobado</h1> : <h1>Pago Rechazado</h1>}
          <p className={styles.predirect}>redirigiendo al perfil...</p>
          {/* <h2>{details.comments}</h2> */}
        </div>
      )}
      <Footer />
    </div>
  );
}
