import axios from "axios";
// import {  } from "../REDUX/actions/action";
import { Button } from "primereact/button";
//import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "primereact/skeleton";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localhost } from "../REDUX/actions/action";

function loader() {
  return (
    <>
      <h1>CONFIRMANDO EL PAGO</h1>
      <div className="grid formgrid"></div>
      <div className="field col-12 md:col-6 md:pr-6 pr-0">
        <div>
          <div className="flex mb-3">
            <Skeleton width="4rem" height="4rem" className="mr-2"></Skeleton>
            <div>
              <Skeleton width="10rem" height="1rem" className="mb-2"></Skeleton>
              <Skeleton width="5rem" className="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="80%" height="150px"></Skeleton>
        </div>
      </div>
    </>
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
  const logged = JSON.parse(localStorage.login)
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
  }, []);

  return (
    <div>
      {/* {(!loading)&& <p>hubo un problema con el pago</p>} */}
      {loading ? (
        loader()
      ) : (
        <div style={{}}>
          {serverCheck ? <h1>Pago Aprobado</h1> : <h1>Pago Rechazado</h1>}
          <h1>#{bookingID.slice(24)}</h1>
          <h2>Cuidador</h2>
          <p>{details.keeper.name + " " + details.keeper.last_name}</p>
          <p>{details.keeper.phone} </p>
          <h2>Dueño</h2>
          <p>{details.client.name + " " + details.client.last_name}</p>
          <p>{details.client.phone} </p>
          <h2>Registro</h2>
          <p>{details.check_in}</p>
          <h2>Salida</h2>
          <p>{details.check_out}</p>
          <h2>${details.price}</h2>

          {/* <h2>{details.comments}</h2> */}
          <Link
            to={`/PersonalProfile/${details.client.id}`}
            id="Personal Profile"
          >
            ir a mi perfil
            </Link>
        </div>
      )}
    </div>
  );
}
