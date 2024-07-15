import React, { useState, useEffect } from 'react';

const Time = () => {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setClock(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const hours = clock.getHours();
    const minutes = clock.getMinutes();
    // const seconds = clock.getSeconds();

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    return (
        <div className='text-xs'>
            {`${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`}
            {/* {`${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`} */}

        </div>
    );
}

export { Time };