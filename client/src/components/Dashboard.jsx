import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importing jwtDecode for decoding JWT tokens
import logoutIcon from '../assets/logout.svg';
import profile from '../assets/profile.svg'
import CurrentWeather from './CurrentWeather.jsx';
import WeatherMap from './WeatherMap.jsx';
import Information from './Information.jsx';
import { useAuth } from '../context/AuthContext';
import { API } from '../API/api.jsx';
import { useNavigate } from 'react-router-dom';
import WeatherChatComponent from './WeatherChatComponent.jsx';

export default function Dashboard() {
  // State variables to hold weather data, city input, loading status, and error messages
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY; // Accessing the API key from environment variables
  const { logout } = useAuth(); // Extracting the logout function from the AuthContext
  const navigate = useNavigate();

  // Effect hook to fetch initial weather data based on user location or city from token
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('JWtoken'); // Retrieve JWT from local storage
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode the JWT to access user data
          if (decodedToken.city) {
            fetchWeatherData(decodedToken.city); // Fetch weather data for the extracted city
          } else {
            handleGeolocation(); // Fallback to geolocation if city not found in token
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          handleGeolocation(); // Handle geolocation if token decoding fails
        }
      } else {
        handleGeolocation(); // Fallback to geolocation if no token is found
      }
    };

    fetchData(); // Trigger the data fetching process
  }, []);

  // Function to handle fetching weather data based on geolocation
  const handleGeolocation = () => {
    if ("geolocation" in navigator) { // Check if geolocation is supported
      setIsLoading(true); // Set loading state to true
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords; // Destructure latitude and longitude
        fetchWeatherDataByCoords(latitude, longitude); // Fetch weather data based on coordinates
      }, () => {
        setErrorMessage('Geolocation access denied.'); // Handle access denied error
        setIsLoading(false); // Reset loading state
      });
    } else {
      setErrorMessage("Geolocation is not available in your browser."); // Handle unsupported geolocation
    }
  };

  // Function to fetch weather data based on latitude and longitude
  const fetchWeatherDataByCoords = async (latitude, longitude) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
      setWeatherData(res.data); // Set the fetched weather data to state
    } catch (error) {
      setErrorMessage('Error fetching weather data!'); // Handle errors during data fetching
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await axios.post(API.LOGOUTUSER, {}, { withCredentials: true }); // Make a request to logout user
      localStorage.removeItem('JWtoken'); // Remove JWT from local storage
      logout(); // Call the logout function from AuthContext
    } catch (error) {
      console.error("Error logging out:", error); // Log any errors encountered during logout
    }
  };

  // Function to fetch weather data based on city name
  const fetchWeatherData = async (city) => {
    if (!city) return; // Exit early if city is empty

    setIsLoading(true); // Set loading state to true
    setErrorMessage(''); // Reset any previous error messages

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      setWeatherData(res.data); // Set the fetched weather data to state
    } catch (error) {
      setErrorMessage('Error fetching weather data!'); // Handle errors during data fetching
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  };

  // Function to handle search button click
  const OnHandleClick = () => {
    fetchWeatherData(city); // Fetch weather data based on user input city
  };

  return (
    <>
      <div className='font-montserrat'>
        {/* Search bar for entering city name */}
        <label className="mx-auto mt-2 relative min-w-sm max-w-xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2" htmlFor="search-bar">
          <input 
            id="search-bar" 
            placeholder="Enter City" 
            className="font-montserrat font-bold px -6 py-2 w-full rounded-md flex-1 outline-none bg-transparent placeholder-slate-200 text-white" 
            onChange={(e) => setCity(e.target.value)} // Update city state on input change
            value={city} // Set the input value to the city state
          />
          <button
            className="w-full border-white md:w-auto px-6 py-3 text-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70" 
            onClick={OnHandleClick}> {/* Button to trigger weather data fetch */}
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">Search</span>
          </button>
          <button
            className="w-full border-white md:w-auto px-6 py-3 text-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70" 
            onClick={(e)=> { navigate('/profile')}}> {/* Button to Profile */}
            <img src={profile} alt="Logout" /> {/* Profile icon */}
          </button>
          <button
            className="w-full border-white md:w-auto px-6 py-3 text-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70" 
            onClick={handleLogout}> {/* Button to logout user */}
            <img src={logoutIcon} alt="Profile" /> {/* Logout icon */}
          </button>

        
        </label>
      </div>

      {isLoading ? ( // Conditional rendering based on loading state
        <div className="text-white">Loading...</div> // Loading indicator
      ) : (
        <div>
          <div className='flex flex-wrap justify-center m-3'>
            {/* Display current weather and weather map components */}
            <CurrentWeather data={weatherData} />
            <WeatherMap data={weatherData} />
          </div>
          <div className='flex flex-wrap justify-center m-3'>
            {weatherData && <Information data={weatherData} />} {/* Display additional weather information if available */}
          </div>
          {weatherData && <WeatherChatComponent weatherData={weatherData} />} {/* Chat component */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>} {/* Display error messages if any */}
        </div>
      )}
    </>
  );
}
