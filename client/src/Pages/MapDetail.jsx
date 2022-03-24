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
      <div style={{ height: "375", width: "375" }}>
        <MapView coordinates={coordinates} />
      </div>
    </div>
  );
}
