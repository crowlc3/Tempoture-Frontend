import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Logo from "./Tempo-Logo-Grey.png"
import Text_ from "./Tempoture-Text.png"
import { Text, StyleSheet } from 'react-native';

require('dotenv').config()

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-top-read",
  "user-modify-playback-state",
];

const handleLogin = () => { 
  window.location = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${
    process.env.REACT_APP_CLIENT_ID }&redirect_uri=${
      process.env.REACT_APP_REDIRECT_URL}&scope=${
        scopes.join("%20")}&response_type=code&show_dialog=true`;
};

const LogInPage = (props) => {
  return (
    <div className="login">
      <div class="container">
        <div className = "logo">
            <img src={Logo} width="150px"></img>
        </div>
        <div className = "text">
            <img src={Text_} width="250px"></img>
        </div>
        <div className = "RCOS">
          An <a className = "Test" href = "google.com">RCOS</a> Project
        </div>
        <div className = "Version">
            Version 1.0 Coming Summer 2021
        </div>
        <a className = "What" href = "google.com">
            What is Tempoture?
        </a>
        <div className = "Agree">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div className="Checkbox">
          <input type="checkbox" className="Check"/>
          <label className="Label"> Accept User Agreement</label>
        </div>
        <Button variant="info" type="submit" onClick={handleLogin}>
          Login to spotify {process.env.SPOTIFY_CLIENT_ID}
        </Button>
      </div>
      <div className = "Spotify">
        Don't have Spotify? <a className = "Click" href = "google.com">Click here</a>
      </div>
    </div>
  );
};

export default connect()(LogInPage);