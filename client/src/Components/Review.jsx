import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import { Button } from "primereact/button";
import { localhost } from "../REDUX/actions/action";
import { Dialog } from "primereact/dialog";

export const RatingDemo = ({client_id, keeper_id, booking_id}) => {
  const [rate, setRate] = useState(null);
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState(false);
  // let logedUser = useSelector((state) => state.login);

  
  const dispatch = useDispatch()
  const logedUser = JSON.parse(localStorage.getItem("login"));
  // const reviewedUser = JSON.parse(localStorage.getItem("profile_id"));
  const payload = {
    booking_id: booking_id,
    from_id: logedUser.id,//logedUser.id,
    message: value,
    rate: rate,
    reviewedUser_id:  logedUser.id == client_id ? keeper_id : client_id // reviewedUser,
  };

  function submitHandler(e){
    console.log(payload)
      axios.post(`${localhost}/reviews/create`,payload).then((response)=>console.log(response.data))
  }
  function reviewButton(){
    return(
      <Button  onClick={()=>setDisplay(true)} label='OPINAR' />
    )
  }



  return (
  <div>
      {reviewButton()}
      <Dialog 
      dismissableMask
      header={<h1>Déjanos tu opinión</h1>}
      draggable={false}
      visible={display}
        footer={<Button label="Enviar" onClick={()=>submitHandler()}/>}
        onHide={() => setDisplay(false)} >
      <div className="card">
        <h5>Calificación</h5>
        <Rating
          value={rate}
          cancel={false}
          onChange={(e) => setRate(e.value)}
          />
      </div>
      <InputTextarea
        rows={4}
        cols={50}
        maxLength={150}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />
      <p>{value.length}/150</p>
      
    </Dialog>
        </div>
  );
};
