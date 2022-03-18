import React, { useState, useSelect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "primereact/skeleton";
import { useNavigate } from "react-router-dom";
// import {  } from "../REDUX/actions/action";
import { Button } from 'primereact/button';
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
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    },[])


  return (
    <div>
        {loading
        ? 
        loader()
        :
        
        <div >
            <h1>Nro Reserva</h1>
            <h2>Cuidador</h2>
            <p>Nombre del cuidador</p>
            <p>telefono del cuidador</p>
            <h2>Dueño</h2>
            <p>Nombre del Dueño</p>
            <p>telefono del Dueño</p>
            <h2>Check-In</h2>
            <p>fecha de inicio</p>
            <h2>Check-Out</h2>
            <p>fecha de retiro</p>
            <h2>$MONTO</h2>

            <h2>Comentarios</h2>
            <Button label="Ver mis reservas" className="p-button-rounded p-button-success p-button-raised" onClick={()=>{navigate('/bookings')}} />
            {/* <button onClick={()=>navigate('/myBookings')}>ver mis reservas</button> */}
        </div>
        }



    </div>
  );
}
