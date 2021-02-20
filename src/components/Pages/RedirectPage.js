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

const RedirectPage = () => {
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

    //Trying to send API key to the backend
    fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authKey: token,
        zipcode: 'Still waiting to get from API'
      })
    })

  /* change this to a ternerary to see if they have a token*/  
 return <div><Navbar /><h1 className="main-heading"> Redirect Page </h1> {token}</div>;
};

export default RedirectPage;