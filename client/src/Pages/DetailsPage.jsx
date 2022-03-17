import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';


export function DetailsPage() {

    const { search } = useLocation();
    const {id, authorId, description, title, rating, bookings, date} = queryString.parse(search);

    useEffect(()=>{
        console.log("description:", queryString.parse(search));
    }, [])
  return (
    <div>
        <h1>{title}</h1>

        <h3>{description}</h3>

        <h3>Fecha: {date}</h3>

        <h3>Contrataciones: {bookings}</h3>

        <h3>Rating: {rating}</h3>
    </div>
  )
}
