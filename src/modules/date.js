const date = (() => {
  const currentDate = new Date();

  function isItDay() {
    if (currentDate.getHours() > 6 && currentDate.getHours() < 18) {
      return true;
    } else {
      return false;
    }
  }

  function currentDayName() {
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = weekdayNames[currentDate.getDay()];

    return dayName;
  }

  function currentDayNumber() {
    const dayNumber = currentDate.getDate();

    return dayNumber;
  }

  function currentMonth() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = monthNames[currentDate.getMonth()];

    return monthName;
  }

  return { isItDay, currentDayName, currentDayNumber, currentMonth };
})();

export default date;
