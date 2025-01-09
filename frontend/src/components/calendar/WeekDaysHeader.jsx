import React from 'react'

const WeekDaysHeader = () => {
    const DaysOTW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];  
    return (
    <div className='grid grid-cols-7'>
        {DaysOTW.map((day, idx) => (
            <div key={idx} className='text-center font-semibold text-yellow-500 p-2 border-b border-yellow-600 font-body'>
                {day}
            </div>
        ))}
    </div>
  );
};

export default WeekDaysHeader