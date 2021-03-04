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
    }
}