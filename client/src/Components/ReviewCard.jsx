import React from 'react'
import goldStar from '../assets/Gold_Star.png';

export default function ReviewCard({
    id,
    key,
    rating,
    message,
    from
}) {


  const styles={
    container:{
    border : "2px solid black",
    margin : "10px"},
    
    starImg:{
      height: ".8rem"
    }
  }

  return (
    <div key={key} style={styles.container}>
        <h3>{from}</h3>
        <h5>Rating: {rating} <img style={styles.starImg} src={goldStar}/></h5>

        <h5>{message}</h5>
    </div>
  )
}
