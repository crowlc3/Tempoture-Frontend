import React, { useEffect,useState } from "react";
import Navbar from "../Navbar/Navbar";
import {getAddress} from '../location.js';

require('dotenv').config()

function sendData( authKey, zipcode, country, refresh_token, last_refreshed){
  var formData = new FormData();
  formData.append('access_token', authKey);
  formData.append('refresh_token',refresh_token);
  formData.append('last_refresh',last_refreshed);
  formData.append('country',country);
  formData.append('zip_code', zipcode);

  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === ""){
    fetch('http://127.0.0.1:5000/store_user', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
    .then(data => console.log(data));
  }
  else{
    fetch('https://backendtempoture.herokuapp.com/store_user', { //// sorry caplocks, just commit it
      method: 'POST',
      body: formData
    }).then(response => response.json())
    .then(data => console.log(data));
  }
}

export const getCodeFromUrl = () => {
  return window.location.search.substring(1).split("code=")[1];
};

const RedirectPage =  () => {
   const [token, setToken] = useState();
    useEffect(() => {
      const code = getCodeFromUrl();
      if(localStorage.getItem('access_token') !== null)
      {
          const _token = localStorage.getItem('access_token');
          const refresh_token = localStorage.getItem('refresh_token');
          const last_refreshed = localStorage.getItem('last_refreshed');
          if (_token) {
            setToken(_token);
          }
          if ("geolocation" in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
             function success(position) {
               getAddress(position.coords.latitude,position.coords.longitude).then((adress) => {
                  sendData( _token, adress[1], adress[0],refresh_token);
               })
             },
            function error(error_message) {
              // for when getting location results in an error
              console.error('An error has occured while retrieving location', error_message)
            }  
          );
          } else {
            // geolocation is not supported
            // get your location some other way
            console.log('geolocation is not enabled on this browser')
          }
      }
      else
      {
        fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          body: new URLSearchParams({
            'client_id': process.env.REACT_APP_CLIENT_ID,
            'client_secret': process.env.REACT_APP_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri':process.env.REACT_APP_REDIRECT_URL
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }).then(response => response.json())
        .then(data => {
          const _token = data.access_token;
          const refresh_token = data.refresh_token;
          var d = new Date();
          const last_refreshed = d.getTime();

          localStorage.setItem('access_token',_token);
          localStorage.setItem('refresh_token',refresh_token);
          localStorage.setItem('last_refreshed',last_refreshed);
          if (_token) {
            setToken(_token);
          }
          if ("geolocation" in navigator) { // This is duplicated because of the then , in the fetch
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
            function success(position) {
              getAddress(position.coords.latitude,position.coords.longitude).then((adress) => {
                  //Trying to send API key to the backend
                  // When testing on localhost change to localhost:5000/data
                  sendData( _token, adress[1], adress[0],refresh_token);
              })
            },
            function error(error_message) {
              // for when getting location results in an error
              console.error('An error has occured while retrieving location', error_message)
            }  
          );
          } else {
            // geolocation is not supported
            // get your location some other way
            console.log('geolocation is not enabled on this browser')
          }
        });
      }
    }, []);
  /* change this to a ternerary to see if they have a token*/  
 return <div><Navbar /><h1 className="main-heading"> Redirect Page </h1> {token}</div>;
};

export default RedirectPage;