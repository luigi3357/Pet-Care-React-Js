import axios from "axios";
// import {  } from "../REDUX/actions/action";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localhost } from "../REDUX/actions/action";
import styles from'../Components/createBooking.module.css'

export function CreateBooking({ keeper, client, price, info, post_id }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState("");
  const [dates2, setDates2] = useState(null);
  const [dates3, setDates3] = useState(null);
  const [comment, setComment] = useState("");
  const [restricted, setRestricted] = useState([]);
  const [daysAmount, setdaysAmount] = useState(1);
  const [display, setDisplay] = useState(false);

  const [form, setForm] = useState({
    client_id: client.id,
    keeper_id: keeper.id,
    price: price,
  });
  const dispatch = useDispatch();
  let today = new Date();
  let minDate = new Date();
  minDate.setDate(today.getDate() + 1);
  let maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 1);
  let minCOut = new Date();
  const [minOut, setMinOut] = useState(minCOut)

  let maxOut = new Date();
  maxOut.setMonth(today.getMonth() + 1);

  useEffect(() => {
    if (dates2) {
      setMinOut(dates2)
    }
    if (dates2 && dates3) {
      setdaysAmount(daysCalculation(dates2, dates3));
    }
  }, [dates3, dates2]);
  useEffect(() => {
    setTotal(price * daysAmount);
    setForm({...form, price: price*daysAmount})
  }, [daysAmount]);
  useEffect(()=>{
    if(info.contrataciones){
      setRestricted(checkAvaliableDates())
    }
  },[])
  function daysCalculation(start, end) {
    let startGame = start.getTime();
    let endGame = end.getTime();
    const daysms = endGame - startGame;
    return Math.floor(daysms / (1000 * 3600 * 24)) + 1;
  }

  function checkAvaliableDates() {
    if (info.contrataciones.length === 0) return [];
    let takenDays = [];
    info.contrataciones.forEach((booking) => {
      const entry = new Date(booking.check_in)
      const out = new Date(booking.check_out)
      let entryMS = entry.getTime()
      let outMS = out.getTime()
      !takenDays.includes(entryMS) && takenDays.push(entryMS);
      !takenDays.includes(outMS) && takenDays.push(outMS);
      let duration = daysCalculation(entry, out);
      
      if (duration > 1) {
        for (let i = 1; i < duration; i++) {
          let taken = entry.setDate(entry.getDate() + 1);
          !takenDays.includes(taken)&& takenDays.push(taken);
        }
      }
    });
    const restricteDays = takenDays.map((day)=>{
      return new Date(day)
    })
    return restricteDays;
  }
  const postulacion ={owner: keeper.id, keeper: client.id, post: post_id }

  async function contactClient(){
    await axios.post(`${localhost}/bookings/postular`, postulacion).then((response)=>{
      alert('Postulación enviada')
    })
  }

  async function handleSubmit() {
    await axios.post(`${localhost}/bookings/create`, form).then((response) => {
      if(response.status==201){
        setDisplay(false)
        setComment("");
            setDates2(null);
            setDates3(null);
            setTotal("");
            setdaysAmount(1);
            navigate(`/`)
        return alert('Reserva creada con éxito')
      }}).catch((e)=>{
        alert('Hubo un error')
        setDisplay(false)
      })
    };
  
  function footerButton() {
    return (
      <div>
        <button
          className={styles.singleButtonContainer}
          onClick={() => {
            handleSubmit();
          }}
        >CREAR SOLICITUD</button>
        <button
          
          className={styles.singleButtonContainerCancel}
          onClick={() => {
            setDisplay(false);
            setComment("");
            setDates2(null);
            setDates3(null);
            setTotal("");
            setdaysAmount(1);
          }}
        >CANCELAR</button>
      </div>
    );
  }

  return (
    <div className="field col-12 md:col-4">
      {/* tengo que editar este boton */}
      <button
          className={styles.singleButtonContainer}
        
        onClick={
          keeper.keeper ? () => {
          setDisplay(true);
        }: 
        ()=>contactClient()}
      >{keeper.keeper? "RESERVAR" : "POSTULARME"}</button>
      <Dialog
      header={`Solicitud de reserva` }
        visible={display}
        footer={footerButton}
        onHide={() => setDisplay(false)}
      >
        <label className={styles.labelreserva} htmlFor="range">¿Cuando llega tu mascota?</label>
        <br />
        <Calendar
          id="range"
          required
          minDate={minDate}
          maxDate={maxDate}
          value={dates2}
          disabledDates={restricted?restricted:null}
          onChange={(e) => {
            if(!dates3 || dates3<e.target.value){setDates3(e.target.value)}
            setForm({
              ...form,
              check_in: e.target.value.toISOString().slice(0, 10),
            });
            setDates2(e.target.value);
          }}
          selectionMode="single"
          readOnlyInput
          />
        <br />
        <br />
        <label className={styles.labelreserva} htmlFor="range">¿Cuando la pasas a buscar?</label>
        <br />
        <Calendar
          id="range"
          required
          minDate={minOut}
          maxDate={maxOut}
          value={dates3}
          onChange={(e) => {
            setForm({
              ...form,
              check_out: e.target.value.toISOString().slice(0, 10),
            });
            setDates3(e.target.value);
          }}
          selectionMode="single"
          readOnlyInput
          />
        <br />

        <h2 className={styles.comments}>Comentarios</h2>
        <InputTextarea
          className={styles.textArea}
          rows={5}
          cols={30}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setForm({ ...form, comment: e.target.value });
          }}
          maxLength={150}
          />
      <h2>Total a pagar ${total}</h2>
      </Dialog>
    </div>
  );
}


