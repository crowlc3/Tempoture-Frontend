import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

const RedirectPage =  () => {
   const [token, setToken] = useState();

    useEffect(() => {
      const hash = getTokenFromUrl();
      window.location.hash = "";
      const _token = hash.access_token;
  
      if (_token) {
        setToken(_token);
      }
  
      console.log("token", token);
    }, []);
        
    var lat = '';
    var long = '';

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        console.log("Geolocation is not supported by this browser.");
      }
    }
    
    function showPosition(position) {
      lat = (position.coords.latitude).toString();
      long = (position.coords.longitude).toString();
      //console.log(lat);
      //console.log(long);
    }

    getLocation();
    console.log(lat);
    console.log(long);

    var zipcode = '';
    fetch('https://api.tomtom.com/search/2/reverseGeocode/' + lat + ',' + long + '.JSON?key=' + (process.env.REACT_APP_GEO_KEY).toString())
      .then(response => {
        return response.json();
    })
    .then(data => {
      zipcode = data.addresses[0].address.postalCode;
      console.log(data);

    var formData = new FormData();
    formData.append('authKey',token);
    formData.append('zipcode',zipcode);
    
    //Trying to send API key to the backend
    // When testing on localhost change to localhost:5000/data
    fetch('https://backendtempoture.herokuapp.com/data', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
    .then(data => console.log(data));
  });
  
  /* change this to a ternerary to see if they have a token*/  
 return <div><Navbar /><h1 className="main-heading"> Redirect Page </h1> {token}</div>;
};

export default RedirectPage;