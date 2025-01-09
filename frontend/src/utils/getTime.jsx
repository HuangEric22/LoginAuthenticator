import dayjs from 'dayjs'

export const getMonth = (month = dayjs().month()) => {
  
    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfMonth;
    // create calendar with 5 rows and 7 columns for each day of the week and each week in a month
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    });

    return daysMatrix;
}

