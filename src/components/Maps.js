import React, { useState } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import Geocode from 'react-geocode';
// import AutoComplete from "react-google-autocomplete";
import Mapautocomplete from './Mapautocomplete';
Geocode.setApiKey('AIzaSyAQLhbqMNW1j54RhL_uDM5yvCXJTFSObE8');

const Maps = ({ handleAddress, initialValues }) => {
  const [state, setState] = useState({
    address: '',
    zoom: 15,
    height: 500,
    mapPosition: {
      lat: initialValues ? initialValues.lat : 6.82147,
      lng: initialValues ? initialValues.lng : -5.27985
    },
    markerPosition: {
      lat: initialValues ? initialValues.lat : 6.82147,
      lng: initialValues ? initialValues.lng : -5.27985
    }
  });

  const onMarkerDragEnd = evt => {
    let newLat = evt.latLng.lat();
    let newLng = evt.latLng.lng();
    console.log(newLat, newLng);
    Geocode.fromLatLng(newLat, newLng).then((res, err) => {
      console.log(res);
      setState({
        ...state,
        address: res.results[0].formatted_address,
        markerPosition: {
          lat: res.results[0].geometry.location.lat,
          lng: res.results[0].geometry.location.lng
        },
        mapPosition: {
          lat: res.results[0].geometry.location.lat,
          lng: res.results[0].geometry.location.lng
        }
      });
      handleAddress({
        address: res.results[0].formatted_address,
        markerPosition: {
          lat: res.results[0].geometry.location.lat,
          lng: res.results[0].geometry.location.lng
        },
        mapPosition: {
          lat: res.results[0].geometry.location.lat,
          lng: res.results[0].geometry.location.lng
        }
      });
    });
  };

  const handlePlaceSelected = res => {
    console.log(res);
    setState({
      ...state,
      address: res.address,
      markerPosition: {
        lat: res.lat,
        lng: res.lng
      },
      mapPosition: {
        lat: res.lat,
        lng: res.lng
      }
    });
    handleAddress({
      address: res.address,
      markerPosition: {
        lat: res.lat,
        lng: res.lng
      },
      mapPosition: {
        lat: res.lat,
        lng: res.lng
      }
    });
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap defaultZoom={8} defaultCenter={state.mapPosition}>
        {console.log(state)}
        <Marker
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={state.markerPosition}
        />
        <Mapautocomplete
          handlePlaceSelected={handlePlaceSelected}
          // style={{ zIndex: '100000' }}
        />
        {/* <AutoComplete
          apiKey="AIzaSyAQLhbqMNW1j54RhL_uDM5yvCXJTFSObE8"
          style={{
            width: "100%",
            heoght: "40px",
            paddingLeft: 16,
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
          onPlaceSelected={handlePlaceSelected}
        /> */}
      </GoogleMap>
    ))
  );
  return (
    <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQLhbqMNW1j54RhL_uDM5yvCXJTFSObE8&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default Maps;
