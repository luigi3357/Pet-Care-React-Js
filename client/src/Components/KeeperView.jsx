import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import { RatingDemo } from "./Review";


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
          <div>
          
          <p>Esta reserva fue completada</p>
          {
            !checkout_details.keeper_review ?
            <>
            <Link to={"/"}>volver</Link>
          <p >Dejanos tu opinión sobre {checkout_details.client.name}</p>
          <RatingDemo  client_id={checkout_details.client_id} keeper_id={checkout_details.keeper_id} booking_id={checkout_details.id}  />
            </>
          :null}
        </div>
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
          const salida = new Date(checkout_details.check_out)
          const today = new Date()
          if(checkout_details.status=='accepted'){
            return (
              <div>
                <p>El cliente aún no ha confirmado</p>
                <Link to={"/"}>volver</Link>
              </div>
            )}
          // if(checkout_details.status == 'approved' && salida.getTime()> today.getTime()){
          //   return (
          //     <div>
          //       <p>Reserva en curso</p>
          //       <Link to={"/"}>volver</Link>
          //     </div>
          //   )}
          if(checkout_details.status == 'approved'/* && salida.getTime()< today.getTime()*/){
            return (
              <div>
                <Link to={"/"}>volver</Link>
                <Button
            label={"Completada"}
            className="p-button-rounded p-button-success p-button-raised"
            onClick={complete}
            />
              </div>
            )}
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
              <Link to={`/Profile/${checkout_details.client.id}`}>
              <p>
                {checkout_details.client.name +
                  " " +
                  checkout_details.client.last_name}
              </p>
                  </Link>
              <p>{checkout_details.client.phone} </p>
              <h2>Registro</h2>
              <p>{checkout_details.check_in.slice(0,10)}</p>
              <h2>Salida</h2>
              <p>{checkout_details.check_out.slice(0,10)}</p>
      
              <h2>TOTAL</h2>
              <h2>${checkout_details.price}</h2>
      
              <h2>Comentarios</h2>
              <h2>{checkout_details.comment}</h2>
              {acceptButton(checkout_details.status, accept)}
              {!status.includes(checkout_details.status) &&
                cancelButton(checkout_details.status, cancelOrder)}
            </div>
          </div>
        );
      }