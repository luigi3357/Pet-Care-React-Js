import React, {useState} from 'react';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import  './FormPost/EditProfileform/EditProfile.css'
export default function AddressAutocom (){
    const[address, setAddress] = useState("")
    const[coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })
    const placeholder = JSON.parse(localStorage.login).location

    const handleSelect = async value => {

        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0])
        setAddress(value)
        setCoordinates(latlng)
        const objetoLocation = {
            ...latlng,
            address: value,
        }
        window.localStorage.setItem('newLocation', JSON.stringify(objetoLocation))
    }



    return(
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input 
                     
                    {...getInputProps({
                        placeholder: (placeholder && placeholder.length>0) ? placeholder[0].address : 'Ingresa tu dirección',
                        className: 'form_input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}