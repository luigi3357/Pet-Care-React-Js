import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DetailsPage from '../Pages/DetailsPage';
import ReviewCard from './ReviewCard';
import profileDefault from '../assets/profile.jpg';

export default function PostCard({
    id,
    authorId,
    date,
    title = 'titulo',
    image = profileDefault,
    rating= 6,
    bookings=9,
    description= "lorem ipsum dolor sit amet consectetur adipiscing elit",
    // reviews,
}) {

    const [showDetails, setShowDetails] = useState(false);

    var reviews = [
        {
            id: "sdsdsdsd"
            ,rate: 4
            ,message: "dolor sit amet"
            ,from_id:'lorem ipsum'
        },
        {
            id: "tititutltuo"
            ,rate: 5
            ,message: "dolor sit amet"
            ,from_id:'lorem ipsum'
        },
        {
            id: "kjhkjhkhkhkjh"
            ,rate: 3
            ,message: "dolor sit amet"
            ,from_id:'lorem ipsum'
        },
        {
            id: "kjjjjjjjjjj"
            ,rate: 2
            ,message: "un año en la selva"
            ,from_id:'hablandole a una camara apagada'
        },
        {
            id: "oioioioi"
            ,rate: 1
            ,message: "como"
            ,from_id:'dice'
        }
    ]

    function toggleDetails(){
        setShowDetails(!showDetails);
    }

    const styles={
        container : {
            width : '50vw'
            ,border : '2px solid black'
        },
        profileImg :{
            width : '20vw'
        }
    }

  return (
    <div style={styles.container}>
        <h3>{title}</h3>

        <img style={styles.profileImg} src={image} alt={`imagen de perfil de ${title}`}/>

        <h5>Rating: {rating}</h5>
        <h5>Contrataciones: {bookings}</h5>

        {/* Botón de detalles */}
        <input type="button" id="detailsBtn" onClick={()=> toggleDetails()} title="Detalles" value="Detalles"/>

        {/* Detalles */}
        {showDetails?
        <div>
            <h5>{description}</h5>
            <div style={{width: "35vw", overflowX: "scroll",display:"flex", flexDirection:"row", WebkitScrollSnapType: "none"}}>
            {reviews ?

                
                reviews.map((i) => {
                  return (
                      <div>
                    <ReviewCard
                      id={i.id}
                      key={i.id}
                      rating={i.rate}
                      message={i.message}
                      from={i.from_id}
                    />
                    </div>)}):
                 <h5>El usuario aún no posee reviews</h5>
              
            }</div>

        <Link to={{
                 pathname:`/DetailsPage?description=${description}&title=${title}&id=${id}&authorId=${authorId}&date=${date}&rating=${rating}&bookings=${bookings}`
        }} id="detailPageBtn" >
            Más detalles
        </Link>
            

        </div>
        :null}


    </div>
  )
}
