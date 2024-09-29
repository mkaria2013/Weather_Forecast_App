import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ data }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [mapCenter, setMapCenter] = useState([22.3039, 70.8022]); // Default center coordinates
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const zoomLevel = 7.5;
  const API_KEY = import.meta.env.VITE_API_KEY; // Use environment variable

  // Update map center when city changes
  useEffect(() => {
    if (data && data.coord) {
      const { lon, lat } = data.coord;
      setMapCenter([lat, lon]);
    }
  }, [data]);

  // Fetch weather data when city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (data && data.coord) {
        const { lon, lat } = data.coord;
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
          if (!response.ok) {
            throw new Error('Weather data not available');
          }
          const weatherData = await response.json();
          setWeatherData(weatherData);
          setLoading(false);
        } catch (error) {
          setError('Error fetching weather data');
          setLoading(false);
        }
      }
    };

    fetchWeatherData();
  }, [data, API_KEY]);

  // Memoize the icon to avoid re-creating it on each render
  const weatherIcon = useMemo(() => {
    if (weatherData && weatherData.weather[0].icon) {
      return L.icon({
        iconUrl: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
        iconSize: [60, 60],
      });
    }
    return null;
  }, [weatherData]);

  // Custom component to handle map center change
  const MapCenterUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, zoomLevel);
      }
    }, [center, map]);
    return null;
  };

  // Handle case where data is null or undefined
  if (!data) {
    return <div className='text-white text-xl'>Loading Map...</div>; // or render a loading indicator or error message
  }

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={zoomLevel} 
      className='w-6/12 border-transparent border-solid border-2 rounded-2xl m-2 p-3 bg-black-glass hover:scale-110 transition ease-in-out'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenterUpdater center={mapCenter} />
      {loading && <div>Loading weather data...</div>}
      {error && <div>{error}</div>}
      {weatherData && !loading && !error && (
        <Marker position={mapCenter} icon={weatherIcon}>
          <Popup>
            <div>
              <h2>{weatherData.name}</h2>
              <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" style={{ width: '60px', height: '60px' }} />
              <p>{weatherData.weather[0].description}</p>
              <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default WeatherMap;