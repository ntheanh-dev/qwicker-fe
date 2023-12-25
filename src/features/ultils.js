export const formatDate = (date, time) => {
    const dayOfWeek = date.getUTCDay() === 7 ? "CN" : date.getUTCDay() + 1
    return `Th ${dayOfWeek}, thg ${date.getMonth() + 1} ${date.getDate()}, ${time.getUTCHours()}:${time.getMinutes()}`;
};
// export const formatDate = (date, time) => {
//     return `${date.getDate()}/${date.getMonth() +
//       1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
//   };