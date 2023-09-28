function compareTime(timeString1, timeString2) {
  let DATE1 = new Date(timeString1);
  let DATE2 = new Date(timeString2);
  return DATE1.getTime() > DATE2.getTime();
}

function formatDateAndTimeWithDayName(timestamp) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const dayName = daysOfWeek[date.getDay()]; // Get the day name

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDateTime = `${formattedDate} at ${formattedTime} on ${dayName}`;

  return formattedDateTime;
}

const timestamp = "2022-09-12T23:03:12.000Z";
const formattedDateTime = formatDateAndTimeWithDayName(timestamp);

console.log(formattedDateTime); // Output: '12-09-2022 at 23:03:12 on Monday'

module.exports = {
  compareTime,
  formatDateAndTimeWithDayName,
};
