import React from "react";
import { Time } from './Time.jsx';
import wind_svg from '../assets/wind.svg';
import rain_svg from '../assets/rain.svg';
import uv_index_svg from '../assets/uv_index.svg';
import humidity_svg from '../assets/humidity.svg';

export default function CurrentWeather(props) {
    // Destructuring props to extract data
    const { data } = props;

    if (!data) {
        return <div>Loading...</div>;
    }

    const { main, weather, wind, rain } = data;

    const temp = (main.temp - 273.15).toFixed(0);

    return (
        <>
            <div className='border-transparent border-solid border-2 rounded-2xl w-max m-2 p-3 bg-black-glass text-white'>
                <div className="font-montserrat font-bold p-2">
                    {/* Current Weather Title */}
                    <div>Current Weather</div>

                    {/* Time Component: Show Current Time */}
                    <div><Time /></div>
                </div>

                <div className='flex flex-wrap items-center text-4xl p-2 gap-3'>
                    {/* Image or Icon: Change according to weather */}
                    <div className='w-24'>
                        <img src='../temp/weather-overcast-partly-rain-icon-in-duo-tone-color-forecast-raining-season-monsoon-vector.jpg' alt="Weather Icon" />
                    </div>

                    <div>
                        <div className='flex'>
                            {/* Temperature */}
                            <div className='font-montserrat font-bold'>{temp}</div>
                            <sup className='font-montserrat font-bold text-sm mb-3 p-1'>
                                <sup className='font-montserrat font-bold text-sm'>•</sup>
                                {/* Celsius or Fahrenheit */}
                                C
                            </sup>
                        </div>

                        {/* Weather condition in words */}
                        <span className='text-xl align-top uppercase'>{weather[0].description}</span>
                    </div>
                </div>

                {/* Other weather-related information */}
                <div className='flex flex-wrap gap-2 font-montserrat text-xs font-bold'>
                    {/* Wind */}
                    <div className='p-2'>
                        <img src={wind_svg} className='w-10' alt="Wind Icon" />
                        <div className='p-1 text-center'>{wind.speed}</div>
                        <div className='p-1 text-center'>KM/H</div>
                    </div>

                    {/* Rain */}
                    <div className='p-2'>
                        <img src={rain_svg} className='w-10' alt="Rain Icon" />
                        <div className='p-1 text-center'></div>
                    </div>

                    {/* UV Index */}
                    <div className='p-2'>
                        <img src={uv_index_svg} className='w-10' alt="UV Index Icon" />
                        <div className='p-1 text-center'>33</div>
                    </div>

                    {/* Humidity */}
                    <div className='p-2'>
                        <img src={humidity_svg} className='w-10' alt="Humidity Icon" />
                        <div className='p-1 text-center'>{main.humidity}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
