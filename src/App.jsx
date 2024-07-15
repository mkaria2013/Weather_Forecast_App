import './App.css'
import React, { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather.jsx';
import axios from 'axios';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const API_KEY = `b88201ee87dc72048a7c6969c4d77452`;

  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          const latitude = position.coords.latitude.toFixed(3);
          const longitude = position.coords.longitude.toFixed(3);

          try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
            setWeatherData(res.data);
          } catch (error) {
            alert('Error fetching weather data!');
          }
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    };

    fetchData();
  }, []);

  const fetchWeatherData = async () => {
    if (!city) {
      return null;
    }

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(res.data);
    } catch (error) {
      alert('Error fetching weather data!');
    }
  }

  const OnHandleClick = (e) => {
    fetchWeatherData();
  }

  return (
    <>
      {/* Search Bar Component */}
      <div>
        <label
          className="mx-auto mt-2 relative min-w-sm max-w-xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2"
          htmlFor="search-bar">

          <input id="search-bar" placeholder="Enter City" htmlFor="city"
            className="px -6 py-2 w-full rounded-md flex-1 outline-none bg-transparent placeholder-white text-white" onChange={(e) => setCity(e.target.value)} />
          <button
            className="w-full border-white md:w-auto px-6 py-3 text-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70" onClick={OnHandleClick}>

            <div className="relative">

              <div
                className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg className="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>

              <div className="flex items-center transition-all opacity-1 valid:"><span
                className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>

              </div>

            </div>

          </button>
        </label>
      </div>


      {/* Components */}
      <div className='flex flex-wrap'>
        <CurrentWeather data={weatherData} />
      </div>
    </>

  )
}
