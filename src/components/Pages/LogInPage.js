import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

require('dotenv').config()

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

const handleLogin = () => { 
  window.location = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${
    process.env.REACT_APP_CLIENT_ID }&redirect_uri=${
      process.env.REACT_APP_REDIRECT_URL}&scope=${
        scopes.join("%20")}&response_type=token&show_dialog=true`;
};

const LogInPage = (props) => {
  return (
    <div className="login">
      <h1 className="main-heading"> Tempoture </h1>
      <Button variant="info" type="submit" onClick={handleLogin}>
        Login to spotify {process.env.SPOTIFY_CLIENT_ID}
      </Button>
    </div>
  );
};

export default connect()(LogInPage);