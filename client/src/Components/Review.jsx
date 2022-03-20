import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import axios from "axios";
import { Button } from "primereact/button";
import { localhost } from "../REDUX/actions/action";

export const RatingDemo = () => {
  const [rate, setRate] = useState(null);
  const [value, setValue] = useState("");
  const dispatch = useDispatch()
  const logedUser = JSON.parse(localStorage.getItem("login"));
  const reviewedUser = JSON.parse(localStorage.getItem("profile_id"));
  const payload = {
    from_id: "c1290c43-39ae-4ec3-9e14-ac75dee01275",//logedUser.id,
    message: value,
    rate: rate,
    reviewedUser_id:"6951228f-8797-49dc-b6b4-0e7664f33d64"// reviewedUser,
  };

  function submitHandler(e){
    console.log(payload)
      axios.post(`${localhost}/reviews/create`,payload).then((response)=>console.log(response.data))
  }

  return (
    <>
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
      <Button label="Enviar" onClick={()=>submitHandler()}/>
    </>
  );
};
