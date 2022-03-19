import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import queryString from 'query-string';


export const DetailsPage = ()=> {
    const {id} = useParams()
    const location = useLocation();
    const { description, title, author, updatedAt, type, size, address, price} = location.state;

    useEffect(()=>{
    }, [])
  return (
    <div>
        <h1>{title}</h1>

        <h3>{description}</h3>

        <h3>Fecha de publicacion: {updatedAt.slice(0,10)}</h3>

        <h3>Contrataciones: {author.bookings}</h3>
        <h3>especie: {type}</h3>
        <h3>tamaño: {size}</h3>
        <h3>Direccion: {address||'No tiene'}</h3>
        <h3>Precio: {price}</h3>

        <h3>Rating: {author.rating}</h3>
    </div>
  )
}
