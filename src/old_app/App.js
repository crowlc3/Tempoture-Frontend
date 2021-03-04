// import React, {useState, useEffect} from 'react';
// import './App.css';

// function App() {
//   const [initialData, setInitialData] = useState([{}])

//   useEffect(()=> {
//     fetch('https://cors-anywhere.herokuapp.com/backendtempoture.herokuapp.com/api').then(
//       response => response.json()
//     ).then(data => setInitialData(data))
//   }, []);
//   return (
//     <div className="App">
//       <h1>{initialData.title}</h1>
//     </div>
//   );
// }

// export default App;
/*
import React, { Component } from 'react';
import 'reset-css/reset.css';
import Navbar from "../components/Navbar/Navbar";
import './App.css';
import queryString from 'query-string';
import { BrowserRouter as Router} from 'react-router-dom';

let defaultStyle = {
  color: '#fff',
  'font-family': 'Papyrus'
};
let counterStyle = {
  ...defaultStyle,
  width: "40%",
  display: 'inline-block',
  'margin-bottom': '20px',
  'font-size': '20px',
  'line-height': '30px'
}
const loginButtonSection = {
  position: 'absolute',
  width: '354px',
  height: '52px',
  left: '800px',
  top: '607px',
  justifyContent: 'center',
  alignItems: 'center',
  'font_family': 'Arial',
  'font_style': 'normal',
  'font-weight': 'bold',
  'font-size': '26px',
  'line-height': '41px',
  color: '#FFFFFF',
  'border-radius': '138.21px',
  background: 'Transparent'
};
let wordStyles = {
  'font-family': 'Papyrus',
  'font-style': 'italic',
  'font-weight': 'normal',
  'font-size': '110px',
  'line-height': '130px',

  color: '#000000'
}
function isEven(number) {
  return number % 2
}

class PlaylistCounter extends Component {
  render() {
    let playlistCounterStyle = counterStyle
    return (
      <div style={playlistCounterStyle}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    let totalDurationHours = Math.round(totalDuration / 60)
    let isTooLow = totalDurationHours < 40
    let hoursCounterStyle = {
      ...counterStyle,
      color: isTooLow ? 'red' : 'white',
      'font-weight': isTooLow ? 'bold' : 'normal',
    }
    return (
      <div style={hoursCounterStyle}>
        <h2>{totalDurationHours} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)}
          style={{
            ...defaultStyle,
            color: 'black',
            'font-size': '20px',
            padding: '10px'
          }} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{
        ...defaultStyle,
        display: 'inline-block',
        width: "25%",
        padding: '10px',
        'background-color': isEven(this.props.index)
          ? '#C0C0C0'
          : '#808080'
      }}>
        <h2>{playlist.name}</h2>
        <img src={playlist.imageUrl} style={{ width: '60px' }} />
        <ul style={{ 'margin-top': '10px', 'font-weight': 'bold' }}>
          {playlist.songs.map(song =>
            <li style={{ 'padding-top': '2px' }}>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
        }
      }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
          })
          let trackDataPromise = responsePromise
            .then(response => response.json())
          return trackDataPromise
        })
        let allTracksDataPromises =
          Promise.all(trackDataPromises)
        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                duration: trackData.duration_ms / 1000
              }))
          })
          return playlists
        })
        return playlistsPromise
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          return {
            name: item.name,
            imageUrl: item.images[0].url,
            songs: item.trackDatas.slice(0, 3)
          }
        })
      }))

      fetch('https://api.spotify.com/v1/me/player/recently-played',{
            headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(response => response.json())

  }
  render() {
    let playlistToRender =
      this.state.user &&
        this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
          let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
            .includes(this.state.filterString.toLowerCase()))
          return matchesPlaylist || matchesSong
        }) : []
    return (
      <div className="App">
        <Router>
        <Navbar />
        <p style={{
          ...wordStyles,
          position: 'absolute',
          width: '961px',
          height: '218px',
          left: '500px',
          top: '297px',}}> Music</p>
          <p style={{
          ...wordStyles, 
          position: 'absolute',
          width: '961px',
          height: '218px',
          left: '500px',
          top: '400px',}}>for your Weather</p>
        {this.state.user ?
          <div>
            <h1 style={{
              ...defaultStyle,
              'font-size': '54px',
              'margin-top': '5px'
            }}>
              {this.state.user.name}'s Playlists
          </h1>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter onTextChange={text => {
              this.setState({ filterString: text })
            }} />
            {playlistToRender.map((playlist, i) =>
              <Playlist playlist={playlist} index={i} />
            )}
          </div> : <button onClick={() => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'https://frontendtempoture.herokuapp.com/login'
          }
          }
          style={{...loginButtonSection}}>CONNECT SPOTIFY</button>
        }
        </Router>
      </div>
    );
  }
}

export default App;
*/
