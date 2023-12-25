export const formatDate = (date, time) => {
    return `thg ${date.getMonth() + 1} ${date.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`;
};
// export const formatDate = (date, time) => {
//     return `${date.getDate()}/${date.getMonth() +
//       1}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
//   };