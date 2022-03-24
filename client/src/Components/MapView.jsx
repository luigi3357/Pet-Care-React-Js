import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useSelector, useDispatch } from "react-redux";
import { usersCoordinates } from "../REDUX/actions/action";
import { Link } from "react-router-dom";

const Map = ({ setCoordinates, coordinates, cards }) => {
  const dispatch = useDispatch();
  const showPointers = useSelector((state) => state.usersCoordinates);
  const coordinatesO = { lat: -34.61315, lng: -58.3772 };
  //const showPointers = [{ lat:-34.61315, lng:-58.3772},{ lat:-44.61315, lng:-58.3772}]

  const [state, setState] = useState({
    currentLocation: { lat: -34.61315, lng: -58.3772 },
    zoom: 10,
  });

  useEffect(() => {
    dispatch(usersCoordinates());
  }, [dispatch]);



  return (
    <div style={{ height: "50vh", width: "50vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDeA8Tsyhg3MKhpbtgn_Vl4uEOcnqhiSGs" }}
        /* style={{}} */
        defaultCenter={coordinatesO}
        center={coordinates}
        defaultZoom={state.zoom}
        margin={[50, 50, 50, 50]}
        yesIWantToUseGoogleMapApiInternals
      >
        <div lat={coordinates.lat} lng={coordinates.lng}>
          <p>Ud está Aquí!!</p>
          <img
            style={{ height: "5vh", width: "5vh" }}
            src="https://cdn-icons-png.flaticon.com/512/17/17177.png"
            alt="Marker"
          ></img>
        </div>
        {showPointers?.map((pointers) => {
          if (!pointers.location) {
            return null;
          }

          return (
            <div
              lat={pointers.location[0].lat}
              lng={pointers.location[0].lng}
              key={pointers.id}
            >
              <Link to={`/Profile/${pointers.id}`}>
                <p>{pointers.name}</p>
                <img
                  style={{ height: "3vh", width: "3vh" }}
                  src="https://cdn-icons-png.flaticon.com/512/17/17177.png"
                  alt="Marker"
                ></img>
              </Link>
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
