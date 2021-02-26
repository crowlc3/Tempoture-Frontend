import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {getTokenFromUrl, getZipcodeFromApi } from "./PageFunctions/getUserData"
import { useEffectAllDepsChange } from "./PageFunctions/UseEffectMulti"

function sendData( authKey, zipcode ){
  var formData = new FormData();
  formData.append('authKey', authKey);
  formData.append('zipcode', zipcode);

  fetch('https://backendtempoture.herokuapp.com/data', {
    method: 'POST',
    body: formData
  }).then(response => response.json())
  .then(data => console.log(data));
}

const RedirectPage =  () => {
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token){
      localStorage.setItem('apiToken', _token);
    } else if(localStorage.getItem('apiToken') !== '' && localStorage.getItem('apiToken') !== undefined){
      console.log('apiToken already received');
    } else { console.log("Unable to get Spotify Token"); }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem( 'latitude' , (position.coords.latitude).toString());
        localStorage.setItem('longitude' , (position.coords.longitude).toString());
      });
    } else { console.log("Geolocation is not supported by this browser."); }

  }, []);

  useEffectAllDepsChange(() =>{
    if( localStorage.getItem('latitude') !== '' && localStorage.getItem('latitude') !== undefined &&
        localStorage.getItem('longitude') !== '' && localStorage.getItem('longitude') !== undefined  ){
        getZipcodeFromApi( localStorage.getItem('latitude'), localStorage.getItem('longitude')).then(data => {
          localStorage.setItem('zipcode', data.addresses[0].address.postalCode ); 
        });
    }
  }, [localStorage.getItem('latitude'), localStorage.getItem('longitude') ]);

  useEffectAllDepsChange(() =>{
    if( localStorage.getItem('apiToken') !== '' && localStorage.getItem('apiToken') !== undefined &&
        localStorage.getItem('zipcode') !== '' && localStorage.getItem('zipcode') !== undefined  ){
        sendData(localStorage.getItem('apiToken'), localStorage.getItem('zipcode') )
      }
    }, [ localStorage.getItem('apiToken'),  localStorage.getItem('zipcode')]);

  /* change this to a ternerary to see if they have a token*/
  return <div><Navbar /><h1 className="main-heading"> Redirect Page </h1></div>;
};

export default RedirectPage;