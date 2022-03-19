import React, {useState, useEffect} from 'react';
import GoogleMapReact from "google-map-react";




const Map = ({setCoordinates, coordinates, cards}) => {
    const coordinatesO = {lat:-34.61315, lng:-58.3772}
    const showPointers = [{ lat:-34.61315, lng:-58.3772},{ lat:-44.61315, lng:-58.3772}]
    
    const [state, setState] = useState({
        currentLocation: {lat: -34.61315, lng: -58.3772},
        zoom: 10
    })

   

    console.log(coordinates, "prueba+++++++++")
    


    return (
        <div style={{ height: '80vh', width: '80vh' }}>
            <GoogleMapReact
                bootstrapURLKeys={{key:"AIzaSyDeA8Tsyhg3MKhpbtgn_Vl4uEOcnqhiSGs"}}
                /* style={{}} */
                defaultCenter={coordinatesO}
                center={coordinates}
                defaultZoom={state.zoom}
                margin={[50,50,50,50]}
                yesIWantToUseGoogleMapApiInternals
                
            >
                <div lat={coordinates.lat} lng={coordinates.lng}>
                    <img style={{height: '5vh', width: '5vh'}} src="https://cdn-icons-png.flaticon.com/512/17/17177.png" alt="Marker"></img>
                </div> 
                {
                showPointers.map((pointers, index) => {
                    
                    return (
                        
                            <div lat={pointers.lat} lng={pointers.lng} key={index}>
                                <img style={{height: '3vh', width: '3vh'}} src="https://cdn-icons-png.flaticon.com/512/17/17177.png" alt="Marker"></img>
                            </div>
                    )
                })
                }
                
            </GoogleMapReact>
            
        </div>
    );
}

export default Map;