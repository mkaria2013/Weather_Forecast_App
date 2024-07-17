import React, { useState, useEffect } from "react";
import { Time } from './Time.jsx';
import wind_svg from '../assets/wind.svg';
import sealevel from '../assets/sealevel.svg';
import pressure from '../assets/pressure.svg';
import humidity from '../assets/humidity.svg';
import city from '../assets/city.svg'
export default function CurrentWeather(props) {
    // Destructuring props to extract data
    const { data } = props;
    const [temp, setTemp] = useState(null);
    const [unit, setUnit] = useState(null);

    useEffect(() => {
        if (data) {
            const Ctemp = (data.main.temp - 273.15).toFixed(0);
            setTemp(Ctemp);
            setUnit("C");
        }
    }, [data]);

    if (!data) {
        return <div className="text-white text-xl">Loading...</div>;
    }

    const { name, main, weather, wind } = data;

    const unitChange = () => {
        if (unit == 'C') {
            const Ftemp = ((main.temp - 273.15) * 9 / 5 + 32).toFixed(0);
            setTemp(Ftemp);
            setUnit("F");
        }
        if (unit == 'F') {
            const Ctemp = (main.temp - 273.15).toFixed(0);
            setTemp(Ctemp);
            setUnit("C");
        }
    }

    return (
        <>
            <div className='border-transparent border-solid border-2 rounded-2xl w-max m-2 p-3 bg-black-glass text-white'>
                <div className="font-montserrat font-bold p-2">
                    {/* Current Weather Title */}
                    <div>Current Weather</div>
                    {/* Time Component: Show Current Time */}
                    <div><Time /></div>

                    {/* Current City Name */}
                    <div className="text-center flex justify-center text-3xl pt-3">
                        <img src={city} className="pr-2 scale-150"></img>
                        {name}
                    </div>
                </div>

                <div className='flex flex-wrap justify-center items-center text-4xl p-2 gap-3'>
                    {/* Image or Icon: Change according to weather */}
                    <div className='w-24 scale-150 justify-center flex flex-wrap'>
                        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />
                    </div>

                    <div>
                        <div className='flex' onClick={unitChange}>
                            {/* Temperature */}
                            <div className='font-montserrat font-bold'>{temp}</div>
                            <sup className='font-montserrat font-bold text-sm mb-3 p-1'>
                                <sup className='font-montserrat font-bold text-sm'>•</sup>
                                {/* Celsius or Fahrenheit */}
                                {unit}
                            </sup>
                        </div>

                        {/* Weather condition in words */}
                        <span className='text-xs flex-wrap align-top capitalize'>{weather[0].description}</span>
                    </div>
                </div>

                {/* Other weather-related information */}
                <div className='flex justify-around flex-wrap gap-2 font-montserrat text-xs font-bold'>
                    {/* Wind */}
                    <div className='p-2'>
                        <img src={wind_svg} className='w-10' alt="Wind Icon" />
                        <div className='p-1 text-center'>{wind.speed}</div>
                        <div className='p-1 text-center'>KM/H</div>
                    </div>

                    {/* Sea Level */}
                    <div className='p-2'>
                        <img src={sealevel} className='w-10' alt="Rain Icon" />
                        <div className='p-1 text-center'>{main.sea_level}</div>
                        <div className='p-1 text-center'>hPa</div>
                    </div>

                    {/* Pressure */}
                    <div className='p-2'>
                        <img src={pressure} className='w-10' alt="UV Index Icon" />
                        <div className='p-1 text-center'>{main.pressure}</div>
                        <div className='p-1 text-center'>hPa</div>
                    </div>

                    {/* Humidity */}
                    <div className='p-2'>
                        <img src={humidity} className='w-10' alt="Humidity Icon" />
                        <div className='p-1 text-center'>{main.humidity} %</div>
                    </div>
                </div>
            </div>
        </>
    );
}
