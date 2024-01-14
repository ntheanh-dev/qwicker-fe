
export const formatDate = (date, time) => {
    const dayOfWeek = date.getUTCDay() === 7 ? "CN" : date.getUTCDay() + 1
    return `Th ${dayOfWeek}, thg ${date.getMonth() + 1} ${date.getDate()}, ${time.getUTCHours()}:${time.getMinutes()}`;
};
// export const formatDate = (date, time) => {
//     return `${date.getDate()}/${date.getMonth() +
//       1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
//   };
export const getCurrentDate = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: Month is zero-based
    const year = currentDate.getFullYear();

    return `${year}/${month}/${day}`;
}
export function formatDateToVietnamese(dateString) {
    const monthsInVietnamese = [
        'thg 1', 'thg 2', 'thg 3',
        'thg 4', 'thg 5', 'thg 6',
        'thg 7', 'thg 8', 'thg 9',
        'thg 10', 'thg 11', 'thg 12'
    ];

    const arr = dateString.split('/')
    m = +arr[1] - 1
    const dateObject = new Date(+arr[0], m, +arr[2])
    const day = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const monthInVietnamese = monthsInVietnamese[monthIndex];

    const formattedDate = `Th ${dateObject.getDay() + 1}, ${monthInVietnamese} ${day}`;

    return formattedDate;
}
export function formatMomentDateToVietnamese(dateString) {
    // "2024-01-14 20:00:00"
    var moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Ho_Chi_Minh')
    const date = moment(dateString)

    const day = date.day() + 1
    const strDay = day === 1 ? 'CN' : `Th ${day}`

    const formattedDate = `${strDay}, ${date.date()} thg ${date.month() + 1}`;

    return formattedDate;
}

export function formatMomentDateToVietnamese2(dateString) {
    // "2024-01-14 20:00:00"
    var moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Ho_Chi_Minh')
    const date = moment(dateString)
    const diff = getDiffBetweenTwoTime(dateString)

    const day = date.day() + 1
    const hour = date.hour()
    const minute = date.minute()
    const strM = minute >= 10 ? minute : `0${minute}`
    if (diff.day <= 1) {
        return `Hôm nay, ${hour}:${strM}`
    } else {
        return `${date.date()} Th${date.month() + 1},${hour}:${strM}`;
    }
}

export const getDiffBetweenTwoTime = (time) => {
    var moment = require('moment-timezone');
    moment.tz.setDefault('Asia/Ho_Chi_Minh')
    const orderTiem = moment(time)
    const diff = orderTiem.diff(moment())
    const duration = moment.duration(diff);

    return { hour: duration.hours(), day: duration.days() };
}