import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(()=> {
    fetch('https://cors-anywhere.herokuapp.com/backendtempoture.herokuapp.com/api').then(
      response => response.json()
    ).then(data => setInitialData(data))
  }, []);
  return (
    <div className="App">
      <h1>{initialData.title}</h1>
    </div>
  );
}

export default App;
