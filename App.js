import { useEffect, useState } from 'react';
import './App.css';
import Current from './Components/Current';
import ForeCast from './Components/ForeCast';

const autocompleteURL = 'https://api.weatherapi.com/v1/search.json?key=d38a511b3c1b430d807191952240706&q=';
// eslint-disable-next-line no-template-curly-in-string
const weatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?key=d38a511b3c1b430d807191952240706&q=${city}&days=5&aqi=no&alerts=no`;

function App() {
const[city,setCity] = useState('');
const[clicked,setClicked]= useState(false);
const[current,setCurrent]= useState();
const[forecast,setForecast]= useState();
const[location,setLocation]= useState('');
const[citySuggestion, setCitySuggestion] =useState([]);

const handleClick = async (clickedCity)=>{
  //console.log('clickedCity---',clickedCity);
  setCity(clickedCity);
  setClicked(true);
  const resp = await fetch (weatherURL(city));
  const data = await resp.json();
  setCurrent(data.current);
  setForecast(data.forecast);
  setLocation(data.location.name);
};

useEffect(() => {
  const getDataAfterTimeout = setTimeout(() => {
    const fetchCitySuggestion = async () => {
      const resp = await fetch(autocompleteURL + city);
      const data = await resp.json();
      const citySuggestionData = data.map(
        (curData) => `${curData.name}, ${curData.region}, ${curData.country}`
      );
      setCitySuggestion(citySuggestionData);
    };
    if(!clicked && city.length > 2){
    fetchCitySuggestion();}
    else{
      setCitySuggestion([]);
      setClicked(false);
    }
  },1000);
  return () => clearTimeout(getDataAfterTimeout);
},[city]);

  return (
    <div className="App">
      <div className='header'>
        <b>THE SKY GLIMPSE</b>
        </div>
      <div className="app_body">
        <input 
        type='text' 
        className='citytextbox' 
        placeholder='Enter the city name'
        value={city}
        onChange={(event) => setCity(event.target.value)}
        />
        {citySuggestion.length > 0 && (
        <div className='suggestionWrapper'>
        {citySuggestion.map((curCity) => (
          <div className='suggestion' onClick={()=>handleClick(curCity)}>
            {curCity}
          </div>
        ))}
        </div>
        )}
        {
          current && <Current current={current} city={location}/>
        }
        {
          forecast && <ForeCast forecast = {forecast} city={city}/>
        }
      </div>
    </div>
  );
}

export default App;


