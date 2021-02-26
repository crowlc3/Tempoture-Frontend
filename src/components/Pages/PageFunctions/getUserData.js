
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

export async function getZipcodeFromApi(latitude, longitude){
  let response = await fetch( 'https://api.tomtom.com/search/2/reverseGeocode/' 
                              + latitude + ',' + longitude  + '.JSON?key=' + 
                              (process.env.REACT_APP_GEO_KEY).toString()
                            );
                              
  let data = await response.json();

  return data
}