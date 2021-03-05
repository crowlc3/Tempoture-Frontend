import React, { useEffect,useState } from "react";
import Navbar from "../Navbar/Navbar";
import {getAddress,getCodeFromUrl,getSpotToken} from "./PageFunctions/getUserData"
import {update_location} from "./PageFunctions/UserRestricted"
import {url} from "./../../index"
require('dotenv').config()

async function sendData( authKey, zipcode, country, refresh_token, last_refreshed){
    var formData = new FormData();
    formData.append('access_token', authKey);
    formData.append('refresh_token',refresh_token);
    formData.append('last_refresh',last_refreshed);
    formData.append('country',country);
    formData.append('zip_code', zipcode);
    var name = "";
    if(localStorage.getItem('display_name') === null)
    {
      try {
        let response = await fetch('https://api.spotify.com/v1/me', { 
          method: 'GET',
          headers: {'Authorization': `Bearer ${authKey}`}
        });
        let data = await response.json();
        localStorage.setItem('display_name',data.display_name);
      }
      catch(error) {
        console.log("Couldn't retreive display name from acess_token. ERROR: " + error);
      }
    }
    name = localStorage.getItem('display_name');
    formData.append('display_name',name);
    let response = await fetch(url + 'store_user', { 
      method: 'POST',
      body: formData
    });
    let data =  await response.json();
    console.log(data);
    if(data.message === "User already inserted")
    {
      update_location(name,zipcode,country);
    }
}

const RedirectPage =  () => {
   const [token, setToken] = useState();
    useEffect(() => {
      async function asyncEffect() {
        const code = getCodeFromUrl();
        let _token;
        let refresh_token;
        let last_refreshed;
        let token_received = true;
        if(localStorage.getItem('access_token') !== null && localStorage.getItem('access_token') !== 'undefined' )
        {
          _token = localStorage.getItem('access_token');
          refresh_token = localStorage.getItem('refresh_token');
          last_refreshed = localStorage.getItem('last_refreshed');
        }
        else
        {
          var resp = await getSpotToken(code);
          if(resp[0] === 'N/A')
          {
            token_received = false;
          }
          else
          {
            _token = resp[0];
            refresh_token = resp[1];
            var d = new Date();
            last_refreshed = d.getTime();
            localStorage.setItem('access_token',_token);
            localStorage.setItem('refresh_token',refresh_token);
            localStorage.setItem('last_refreshed',last_refreshed);
          }
        }

        if(token_received)
        {
          if (_token) {
            setToken(_token);
          }
          if ("geolocation" in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
              function success(position) {
                getAddress(position.coords.latitude,position.coords.longitude).then((adress) => {
                  if(adress !== undefined  && adress.length > 1 &&  adress !== '') // This is just in case your missing the env KEY, or you can't (for whatever reason), get the adress from LONG/LAT(Not regarding getting the actual coordinates)
                  {
                    sendData( _token, adress[1], adress[0],refresh_token,last_refreshed);
                  }
                  else
                  {
                    sendData( _token, 'ZipCode N/A', 'US',refresh_token,last_refreshed);
                    console.log("Couldn't retreive Adress from given lat long cooordinates. Check if you have the REACT_APP_GOOGLE_MAP_KEY Key");
                  } 
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
        else {
          console.log("Can't receive token");
        }
      }
      asyncEffect();
    }, []);
  /* change this to a ternerary to see if they have a token*/  
 return <div><Navbar /><h1 className="main-heading"> Redirect Page </h1> {token}</div>;
};

export default RedirectPage;