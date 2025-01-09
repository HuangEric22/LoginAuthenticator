import React from 'react'
import dayjs from 'dayjs';

const Day = ({day, rowIdx}) => {
  // function getCurrentDayClass() {
  //   return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
  // }
  return (
    <div className='border border-yellow-600 flex flex-col'>
        <header className='flex flex-col items-center'>
            {rowIdx === 0 && (<p className='text-sm mt-1 text-gray-300'>{day.format('ddd').toUpperCase()}</p>)}

            <p className={`text-sm p-1 my-1 text-center text-gray-300`}>
                {day.format('DD')}
            </p>
        </header>
    </div>
  );
};

export default Day