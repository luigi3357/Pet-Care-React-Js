import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";

export default function KeeperView({
  checkout_details,
  accept,
  cancelOrder,
  status,
}) {
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

        <h2>{checkout_details.comments}</h2>
        {acceptButton(checkout_details.status, accept)}
        {!status.includes(checkout_details.status) &&
          cancelButton(checkout_details.status, cancelOrder)}
      </div>
    </div>
  );
}

function acceptButton(status, accept) {
  switch (status) {
    case "cancelled":
      return (
        <p>
          el cliente cancelo la solicitud
          <p>Se ha cerrado la operacion</p>
          <Link to={"/"}>volver</Link>
        </p>
      );
    case "rejected":
      return (
        <p>
          Rechazaste esta solicitud
          <p>Se ha cerrado la operacion</p>
          <Link to={"/"}>volver</Link>
        </p>
      );
    case "completed":
      return (
        <p>
          <p>Esta reserva fue completada</p>
          <Link to={"/"}>volver</Link>
        </p>
      );
    case "pending":
      return (
        <div>
          <Button
            label={"Aceptar"}
            className="p-button-rounded p-button-success p-button-raised"
            onClick={accept}
          />
        </div>
      );

    default:
      return (
        <div>
          <p>Ya aceptaste esta reserva</p>
          <Link to={"/"}>volver</Link>
        </div>
      );
  }
}
function cancelButton(status, cancel) {
  switch (status) {
    case "pending":
      return (
        <Button
          label={"Cancelar"}
          className="p-button-rounded p-button-danger p-button-raised"
          onClick={cancel}
        />
      );

    default:
      return null;
  }
}
