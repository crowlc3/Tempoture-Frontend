export const getCodeFromUrl = () => {
  return window.location.search.substring(1).split("code=")[1];
};

export const getAddress = async (latitude,longitude) => {
    try {
        let response =  await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + process.env.REACT_APP_GOOGLE_MAP_KEY + '&location_type=APPROXIMATE&result_type=postal_code')
        let c_response =  await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + process.env.REACT_APP_GOOGLE_MAP_KEY + '&location_type=APPROXIMATE&result_type=country')
        let rJson = await response.json();
        let cJson = await c_response.json();
        return [cJson.results[0].address_components[0].short_name,rJson.results[0].address_components[0].long_name];
    }
    catch(error){
        console.log("Error with Address: " + error);
        return []
    }
}

export const getSpotToken = async (code) =>{
    try {
      let response = await fetch('https://accounts.spotify.com/api/token', {
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
      });
      let data;
      if (response.ok) {
        data = await response.json();
      } 
      else {
        throw new Error("Couldn't retrieve token check if client_secret/client_id in env file or if the redirect code expired.");
      }
      return [data.access_token,data.refresh_token];
    }
    catch(error) {
      console.log("ERROR: " + error);
      return ['N/A'];
    }
}