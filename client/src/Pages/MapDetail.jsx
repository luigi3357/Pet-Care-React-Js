import React, {useState, useEffect} from 'react';
import MapView from "../Components/MapView";

export default function MapDetail (){

    const [coordinates, setCoordinates] = useState({});
    
     useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setCoordinates({
                    lng: position.coords.longitude,
                    lat: position.coords.latitude
                })
                //console.log(coordinates.longitude)
            }, 
            function (error) {
                console.log(error)
            },
            {
                enableHighAccuracy: true
            }
        );
    },[]); 

    return (
        <div>
            <div>
                <h1>Mapa Detallado</h1>
                <h1>Mapa Detallado</h1>
                <h1>Mapa Detallado</h1>
                <h1>Mapa Detallado</h1>
                <h1>Mapa Detallado</h1>
                <h1>Mapa Detallado</h1>
                <h1>Mapa Detallado</h1>
            </div>
            <h1>CARD</h1>
            
            <div style={{ height: '80vh', width: '80vh' }}>
                <MapView 
                    coordinates={coordinates}
                />
            </div>
            
        </div>
    )
}