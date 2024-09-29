import React, { useState, useEffect } from 'react';

// Time component to display the current time
const Time = () => {
    // State to hold the current clock time
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        // Update the clock every second
        const intervalId = setInterval(() => {
            setClock(new Date()); // Set the current time
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const hours = clock.getHours(); // Get the current hour
    const minutes = clock.getMinutes(); // Get the current minutes
    // const seconds = clock.getSeconds(); // Uncomment if seconds need to be displayed

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12; // Convert to 12-hour format, handle midnight case
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    return (
        <div className='text-xs'>
            {/* Display time in 12-hour format */}
            {`${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`}
            {/* Uncomment the following line to include seconds */}
            {/* {`${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`} */}
        </div>
    );
}

export { Time };