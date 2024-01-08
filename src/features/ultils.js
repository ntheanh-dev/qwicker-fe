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
