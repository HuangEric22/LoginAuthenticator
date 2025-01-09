import React from 'react'
import dayjs from 'dayjs';

const Week = () => {
  const Hours = ["8:00AM", "9:00AM","10:00AM", "11:00AM","12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM"];
  return (
    <div className='flex-i grid grid-cols-7 grid-rows-[repeat(13, minmax(0, 1fr))]'>
    {Hours.map((hour, idx) => (
      <React.Fragment key={idx}>
        <div className='flex items-center justify-center border-b border-yellow-500 p-2'>
          <p className='text-yellow-500 font-body'>{hour}</p>
        </div>
      </React.Fragment>
    ))}  
    </div>
  );
}

export default Week



// <div className="grid grid-rows-[repeat(13, minmax(0, 1fr))] grid-cols-7 px-4 py-2">
// {/* Time Column */}
// <div className="w-16 border-r border-yellow-600">
//   {Hours.map((hour, index) => (
//     <div key={index} className="relative h-16">
//       <div className="absolute text-xs font-body text-yellow-500">
//         {hour}
//       </div>
//     </div>
//   ))}
// </div>
// </div>