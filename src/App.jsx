import { useEffect,useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [weather,setWeather]=useState({});
  const [isFarenheit,setIsFarenheit]=useState(true);

 

  useEffect(()=>{
    const success=(pos)=>{
      const lat =pos.coords.latitude
      const lon =pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ee8bac1ffeedaa0006cc6333eebe520b`)
       .then(res => setWeather(res.data))
    }

    navigator.geolocation.getCurrentPosition(success);
  },[])


console.log(weather);
  return (
    <div className="App">
      <div className='Card'>
        <h1>{weather.sys?.country}</h1>
        <div className='Card-title'>
           <div className='title'>
             <h2>{weather.name}</h2>
             <h3>
             <b>{isFarenheit ? Math.floor(((weather.main?.temp-273.15)*9/5 +32)) : Math.floor(weather.main?.temp-273.15)}</b> 
             {isFarenheit ? " °F ": " °C"}
             </h3>
           </div>
           <div className='box-img'>
             <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
           </div>
       </div>
       <div className='extra-info'>
          <div>
            <h3><i class="fa-solid fa-water"></i><b>Weather:</b>{weather.weather?.[0].description}</h3>
            <h3><i class="fa-solid fa-cloud"></i><b>Clouds:</b>{weather.clouds?.all}%</h3>
            <h3><i class="fa-solid fa-wind"></i><b>Wind speed:</b>{weather.wind?.speed}</h3>
            <h3><i class="fa-solid fa-temperature-three-quarters"></i><b>Pressure:</b>{weather.main?.pressure}</h3>
          </div>
       </div>
       <div className='Card-bottom-container'>
         <button onClick={() => setIsFarenheit(!isFarenheit)}>
            Change temp type
         </button>
       </div>
      </div>
    </div>
  )
}

export default App
