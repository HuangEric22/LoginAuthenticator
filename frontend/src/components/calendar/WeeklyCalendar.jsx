import React, { useState } from 'react'
import Month from './Month'
import { getMonth } from '../../utils/getTime';
import WeekDaysHeader from './WeekDaysHeader';
import Week from './Week';

const WeeklyCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    return (
        <React.Fragment>
            <div className='h-[80vh] w-[80vw] flex flex-col bg-opacity-75 bg-gray-900'>
                <h1 className='font-body text-3xl text-yellow-500 flex items-center justify-center'>Course Planner</h1>
                <WeekDaysHeader />
                <div className='flex flex-1 bg-gray-800 bg-opacity-80'>
                <Week />
                </div>
            </div>
        </React.Fragment>
    )
}

export default WeeklyCalendar