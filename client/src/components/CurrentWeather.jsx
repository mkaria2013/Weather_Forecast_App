import React, { useState, useEffect } from "react";
import { Time } from './Time.jsx';
import wind_svg from '../assets/wind.svg';
import sealevel from '../assets/sealevel.svg';
import pressure from '../assets/pressure.svg';
import humidity from '../assets/humidity.svg';
import city from '../assets/city.svg';

export default function CurrentWeather(props) {
    // Destructure the data prop for ease of use
    const { data } = props;

    // State for storing temperature and the unit (Celsius or Fahrenheit)
    const [temp, setTemp] = useState(null);
    const [unit, setUnit] = useState(null);

    // useEffect hook to convert the temperature to Celsius when the data is available
    useEffect(() => {
        if (data) {
            const Ctemp = (data.main.temp - 273.15).toFixed(0); // Convert from Kelvin to Celsius
            setTemp(Ctemp);
            setUnit("C"); // Default unit is Celsius
        }
    }, [data]);

    // Display a loading message while waiting for the data
    if (!data) {
        return <div className="text-white text-xl">Loading...</div>;
    }

    // Destructure data for easy access to needed fields
    const { name, main, weather, wind } = data;

    // Function to handle unit change between Celsius and Fahrenheit
    const unitChange = () => {
        if (unit === 'C') {
            // Convert temperature from Celsius to Fahrenheit
            const Ftemp = ((main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
            setTemp(Ftemp);
            setUnit("F"); // Update unit to Fahrenheit
        } else if (unit === 'F') {
            // Convert temperature back to Celsius
            const Ctemp = (main.temp - 273.15).toFixed(0);
            setTemp(Ctemp);
            setUnit("C"); // Update unit to Celsius
        }
    };

    return (
        <>
            {/* Main container for displaying current weather */}
            <div className='border-transparent border-solid border-2 rounded-2xl w-max m-2 p-3 bg-black-glass text-black'>
                <div className="font-montserrat font-bold p-2">
                    {/* Current Weather Title */}
                    <div>Current Weather</div>

                    {/* Time Component: Display current time */}
                    <div><Time /></div>

                    {/* Display current city name */}
                    <div className="text-center flex justify-center text-3xl pt-3">
                        <img src={city} className="pr-2 scale-150" alt="City Icon" />
                        {name}
                    </div>
                </div>

                {/* Section to display temperature and weather condition */}
                <div className='flex flex-wrap justify-center items-center text-4xl p-2 gap-3'>
                    {/* Weather icon based on current weather */}
                    <div className='w-24 scale-150 justify-center flex flex-wrap'>
                        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />
                    </div>

                    {/* Display temperature and the unit */}
                    <div>
                        <div className='flex mt-5' onClick={unitChange}>
                            <div className='font-montserrat font-bold'>{temp}</div>
                            <sup className='font-montserrat font-bold text-sm mb-3 p-1'>
                                <sup className='font-montserrat font-bold text-sm'>•</sup>
                                {unit}
                            </sup>
                        </div>

                        {/* Display weather description */}
                        <span className='text-xs flex-wrap align-top capitalize'>{weather[0].description}</span>
                    </div>
                </div>

                {/* Display additional weather information such as wind, sea level, pressure, and humidity */}
                <div className='flex justify-around flex-wrap gap-2 font-montserrat text-xs font-bold'>
                    {/* Wind speed */}
                    <div className='p-2'>
                        <img src={wind_svg} className='w-10' alt="Wind Icon" />
                        <div className='p-1 text-center'>{wind.speed}</div>
                        <div className='p-1 text-center'>KM/H</div>
                    </div>

                    {/* Sea level pressure */}
                    <div className='p-2'>
                        <img src={sealevel} className='w-10' alt="Sea Level Icon" />
                        <div className='p-1 text-center'>{main.sea_level}</div>
                        <div className='p-1 text-center'>hPa</div>
                    </div>

                    {/* Atmospheric pressure */}
                    <div className='p-2'>
                        <img src={pressure} className='w-10' alt="Pressure Icon" />
                        <div className='p-1 text-center'>{main.pressure}</div>
                        <div className='p-1 text-center'>hPa</div>
                    </div>

                    {/* Humidity level */}
                    <div className='p-2'>
                        <img src={humidity} className='w-10' alt="Humidity Icon" />
                        <div className='p-1 text-center'>{main.humidity} %</div>
                    </div>
                </div>
            </div>
        </>
    );
}