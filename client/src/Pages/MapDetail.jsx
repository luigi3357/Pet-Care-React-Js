import React, { useState, useEffect } from "react";
import MapView from "../Components/MapView";

export default function MapDetail() {
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoordinates({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        //console.log(coordinates.longitude)
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div>
      <h1>MAP</h1>
      <div style={{ height: "20vh", width: "20vh" }}>
        <MapView coordinates={coordinates} />
      </div>
    </div>
  );
}
