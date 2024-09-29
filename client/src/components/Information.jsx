import axios from "axios";
import React, { useEffect, useState } from "react";
import wind_svg from '../assets/wind.svg';
import sealevel from '../assets/sealevel.svg';
import pressure from '../assets/pressure.svg';
import humidity from '../assets/humidity.svg';

export default function Information(props) {
    // State for storing longitude, latitude, fetched weather data, and temperature unit
    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null);
    const [data, setData] = useState(null);
    const [unit, setUnit] = useState("C"); // Default unit is Celsius

    const API_KEY = import.meta.env.VITE_API_KEY; // OpenWeatherMap API key

    // Effect hook to update coordinates (longitude and latitude) based on props data
    useEffect(() => {
        if (props.data && props.data.coord) {
            setLon(props.data.coord.lon);
            setLat(props.data.coord.lat);
        }
    }, [props]);

    // Effect hook to fetch weather data using longitude and latitude once available
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (lon !== null && lat !== null) {
                try {
                    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                    if (res && res.data) {
                        setData(res.data); // Set fetched data to state
                    }
                } catch (error) {
                    console.error("Error fetching weather data:", error); // Log any errors
                }
            }
        };

        fetchWeatherData();
    }, [lon, lat]); // Trigger fetch whenever longitude or latitude changes

    // Function to format Unix timestamp into 'DD/MM/YYYY' format
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    // Function to get weekday name from Unix timestamp
    const getWeekday = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const options = { weekday: 'long' };
        return date.toLocaleDateString(undefined, options); // Return the full weekday name
    };

    // Function to format Unix timestamp into 'HH:MM AM/PM' format
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // '0' should be '12'
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    };

    // Function to convert temperature from Kelvin to Celsius
    const convertKelvinToCelsius = (tempKelvin) => {
        return (tempKelvin - 273.15).toFixed(0); // Return temperature in Celsius, formatted to remove decimals
    };

    // Function to convert Celsius to Fahrenheit
    const convertCelsiusToFahrenheit = (tempCelsius) => {
        return ((tempCelsius * 9 / 5) + 32).toFixed(0); // Return temperature in Fahrenheit, formatted to remove decimals
    };

    // Function to toggle the temperature unit between Celsius and Fahrenheit
    const toggleTemperatureUnit = () => {
        setUnit(prevUnit => (prevUnit === "C" ? "F" : "C"));
    };

    // Function to get the appropriate temperature value based on the selected unit
    const getTemperatureValue = (tempKelvin) => {
        const tempCelsius = convertKelvinToCelsius(tempKelvin);
        const tempFahrenheit = convertCelsiusToFahrenheit(tempCelsius);
        return unit === "C" ? `${tempCelsius}` : `${tempFahrenheit}`;
    };

    return (
        <>
            {/* Main container for weather information, with scrollable content */}
            <div className='hidescroll font-montserrat border-transparent scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 flex overflow-hidden border-solid border-2 rounded-2xl w-max m-2 p-3 bg-black-glass'>
                <div className="font-montserrat flex p-2 scrolling-content">
                    {!data ? (
                        <p>Loading data</p> // Display loading message while waiting for weather data
                    ) : (
                        data.list.map((item, index) => (
                            <div className='border-solid border-2 align-middle items-center rounded-2xl w-max m-2 p-3 text-black hover:scale-105 transition ease-in-out' key={index}>
                                <div className="font-montserrat text-center font-bold p-2">
                                    {/* Display formatted date and weekday */}
                                    <div>{formatDate(item.dt)} | {getWeekday(item.dt)}</div>
                                    <div className="text-xl">{formatTime(item.dt)}</div>
                                </div>

                                {/* Display weather icon and temperature */}
                                <div className='flex flex-wrap justify-center items-center text-4xl p-2 gap-3'>
                                    <div className='w-24 scale-150 justify-center flex flex-wrap'>
                                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" />
                                    </div>

                                    <div>
                                        {/* Toggle temperature unit when clicked */}
                                        <div className='flex mt-5' onClick={toggleTemperatureUnit}>
                                            <div className='font-montserrat font-bold'>{getTemperatureValue(item.main.temp)}</div>
                                            <sup className='font-montserrat font-bold text-sm mb-3 p-1'>
                                                <sup className='font-montserrat font-bold text-sm'>•</sup>
                                                {unit} {/* Show current unit (C or F) */}
                                            </sup>
                                        </div>

                                        {/* Display weather description */}
                                        <span className='text-xs flex-wrap align-top capitalize'>{item.weather[0].description}</span>
                                    </div>
                                </div>

                                {/* Display additional weather information: wind speed, sea level, pressure, and humidity */}
                                <div className='flex justify-around flex-wrap gap-2 font-montserrat text-xs font-bold'>
                                    {/* Wind speed */}
                                    <div className='p-2'>
                                        <img src={wind_svg} className='w-10' alt="Wind Icon" />
                                        <div className='p-1 text-center'>{item.wind.speed}</div>
                                        <div className='p-1 text-center'>KM/H</div>
                                    </div>

                                    {/* Sea level pressure */}
                                    <div className='p-2'>
                                        <img src={sealevel} className='w-10' alt="Sea Level Icon" />
                                        <div className='p-1 text-center'>{item.main.sea_level}</div>
                                        <div className='p-1 text-center'>hPa</div>
                                    </div>

                                    {/* Atmospheric pressure */}
                                    <div className='p-2'>
                                        <img src={pressure} className='w-10' alt="Pressure Icon" />
                                        <div className='p-1 text-center'>{item.main.pressure}</div>
                                        <div className='p-1 text-center'>hPa</div>
                                    </div>

                                    {/* Humidity level */}
                                    <div className='p-2'>
                                        <img src={humidity} className='w-10' alt="Humidity Icon" />
                                        <div className='p-1 text-center'>{item.main.humidity} %</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}