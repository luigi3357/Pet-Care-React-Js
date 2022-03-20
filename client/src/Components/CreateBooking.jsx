import axios from "axios";
// import {  } from "../REDUX/actions/action";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localhost } from "../REDUX/actions/action";

export function CreateBooking({
  keeper = { name: "john", last_name: "rambo", id: "submachine" },
  client = { name: "john", last_name: "McClane", id: "Dualglock" },
  price = 100,
}) {
  const navigate = useNavigate();
  const [total, setTotal] = useState("");
  const [dates2, setDates2] = useState(null);
  const [dates3, setDates3] = useState(null);
  const [comment, setComment] = useState("");
  const [daysAmount, setdaysAmount] = useState(1);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  let today = new Date();
  let minDate = new Date();
  minDate.setDate(today.getDate() + 1);
  let maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 1);
  let minOut = new Date();
  minOut.setDate(today.getDate() + 1);
  let maxOut = new Date();
  maxOut.setMonth(today.getMonth() + 1);

  useEffect(() => {
    if (dates2) {
      minOut.setDate(dates2.getDate());
    }
    if (dates2 && dates3) {
      setdaysAmount(daysCalculation(dates2, dates3));
    }
  }, [dates3, dates2]);
  useEffect(() => {
    setTotal(price * daysAmount);
  }, [daysAmount]);
  function daysCalculation(start, end) {
    let startGame = start.getTime();
    let endGame = end.getTime();
    const daysms = endGame - startGame;
    return Math.floor(daysms / (1000 * 3600 * 24)) + 1;
  }

  async function handleSubmit() {
    setForm({
      check_in: dates2,
      check_out: dates3,
      client_id: client.id,
      keeper_id: keeper.id,
      price: price,
    });
    await axios
      .post(`${localhost}/bookings/create`, form)
      .then((response) => {
        console.log(response.data);
      })
      .then(() => console.log("ok"));
  }
  const [display, setDisplay] = useState(false);
  function footerButton() {
    return (
      <div>
        <Button
          label="CREAR SOLICITUD"
          className="p-button-rounded p-button-success p-button-raised"
          onClick={{ handleSubmit }}
        />
        <Button
          label="CANCELAR"
          className="p-button-rounded p-button-danger p-button-raised"
          onClick={() => {
            setDisplay(false);
            setComment("");
            setDates2(null);
            setDates3(null);
            setTotal("");
            setdaysAmount(1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="field col-12 md:col-4">
      <Button
        label="RESERVAR"
        className="p-button-rounded p-button-success p-button-raised"
        onClick={() => {
          setDisplay(true);
        }}
      />
      <Dialog
        visible={display}
        footer={footerButton}
        onHide={() => setDisplay(false)}
      >
        <h2>Cuidador</h2>
        <p>{keeper.name + " " + keeper.last_name}</p>
        <h2>${total}</h2>
        <label htmlFor="range">Registro</label>
        <br />
        <Calendar
          id="range"
          required
          minDate={minDate}
          maxDate={maxDate}
          value={dates2}
          onChange={(e) => setDates2(e.value)}
          selectionMode="single"
          readOnlyInput
        />
        <br />
        <label htmlFor="range">Salida</label>
        <br />
        <Calendar
          id="range"
          required
          minDate={minOut}
          maxDate={maxOut}
          value={dates3}
          onChange={(e) => setDates3(e.value)}
          selectionMode="single"
          readOnlyInput
        />
        <br />

        <h2>Comentarios</h2>
        <InputTextarea
          rows={5}
          cols={30}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={150}
        />
      </Dialog>
    </div>
  );
}
