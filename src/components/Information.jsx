import axios from "axios";
import React, { useEffect, useState } from "react";
import wind_svg from '../assets/wind.svg';
import sealevel from '../assets/sealevel.svg';
import pressure from '../assets/pressure.svg';
import humidity from '../assets/humidity.svg';

export default function Information(props) {

    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null);
    const [data, setData] = useState(null);
    const [unit, setUnit] = useState("C");

    const API_KEY = `b88201ee87dc72048a7c6969c4d77452`;

    useEffect(() => {
        if (props.data && props.data.coord) {
            setLon(props.data.coord.lon);
            setLat(props.data.coord.lat);
        }
    }, [props]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (lon !== null && lat !== null) {
                try {
                    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                    if (res && res.data) {
                        setData(res.data);
                    }
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }
        };

        fetchWeatherData();
    }, [lon, lat]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    // Function to get weekday name
    const getWeekday = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const options = { weekday: 'long' };
        return date.toLocaleDateString(undefined, options);
    };

    // Function to format time
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    };

    const convertKelvinToCelsius = (tempKelvin) => {
        return (tempKelvin - 273.15).toFixed(0); // Convert Kelvin to Celsius and format to 1 decimal place
    };

    const convertCelsiusToFahrenheit = (tempCelsius) => {
        return ((tempCelsius * 9 / 5) + 32).toFixed(0); // Convert Celsius to Fahrenheit and format to 1 decimal place
    };

    const toggleTemperatureUnit = () => {
        setUnit(prevUnit => (prevUnit === "C" ? "F" : "C"));
    };

    const getTemperatureValue = (tempKelvin) => {
        const tempCelsius = convertKelvinToCelsius(tempKelvin);
        const tempFahrenheit = convertCelsiusToFahrenheit(tempCelsius);

        return unit === "C" ? `${tempCelsius}` : `${tempFahrenheit}`;
    };

    return (
        <>
            {/* overflow-hidden to overflow-scroll for scroll button */}
            <div className='hidescroll font-montserrat border-transparent scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 flex overflow-hidden border-solid border-2 rounded-2xl w-max m-2 p-3 bg-black-glass'>
                <div className="font-montserrat flex p-2 scrolling-content">

                    {!data ? (
                        <p>Loading data</p>
                    ) : (
                        data.list.map((item, index) => (
                            <div className='border-solid border-2 align-middle items-center rounded-2xl w-max m-2 p-3 text-black hover:scale-105 transition ease-in-out' key={index}>
                                <div className="font-montserrat text-center font-bold p-2">
                                    {/* Time Component: Show Current Time */}
                                    <div>{formatDate(item.dt)} | {getWeekday(item.dt)}</div>
                                    <div className="text-xl">{formatTime(item.dt)}</div>

                                </div>
                                <div className='flex flex-wrap justify-center items-center text-4xl p-2 gap-3'>
                                    {/* Image or Icon: Change according to weather */}
                                    <div className='w-24 scale-150 justify-center flex flex-wrap'>
                                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" />
                                    </div>

                                    <div>
                                        <div className='flex mt-5' onClick={toggleTemperatureUnit}>
                                            {/* Temperature */}
                                            <div className='font-montserrat font-bold'>{getTemperatureValue(item.main.temp)}</div>
                                            <sup className='font-montserrat font-bold text-sm mb-3 p-1'>
                                                <sup className='font-montserrat font-bold text-sm'>•</sup>
                                                {/* Celsius or Fahrenheit */}
                                                {unit}
                                            </sup>
                                        </div>

                                        {/* Weather condition in words */}
                                        <span className='text-xs flex-wrap align-top capitalize'>{item.weather[0].description}</span>
                                    </div>
                                </div>

                                {/* Other weather-related information */}
                                <div className='flex justify-around flex-wrap gap-2 font-montserrat text-xs font-bold'>
                                    {/* Wind */}
                                    <div className='p-2'>
                                        <img src={wind_svg} className='w-10' alt="Wind Icon" />
                                        <div className='p-1 text-center'>{item.wind.speed}</div>
                                        <div className='p-1 text-center'>KM/H</div>
                                    </div>

                                    {/* Sea Level */}
                                    <div className='p-2'>
                                        <img src={sealevel} className='w-10' alt="Rain Icon" />
                                        <div className='p-1 text-center'>{item.main.sea_level}</div>
                                        <div className='p-1 text-center'>hPa</div>
                                    </div>

                                    {/* Pressure */}
                                    <div className='p-2'>
                                        <img src={pressure} className='w-10' alt="UV Index Icon" />
                                        <div className='p-1 text-center'>{item.main.pressure}</div>
                                        <div className='p-1 text-center'>hPa</div>
                                    </div>

                                    {/* Humidity */}
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