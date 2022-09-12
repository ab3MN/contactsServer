const getCurrentDate = () =>
  new Date().toISOString().slice(0, 10).split('-').reverse().join('.');

const getNumberFromMonth = (month) => {
  switch (month) {
    case 1:
      return 0;
    case 2:
      return 28;
    case 3:
      return 59;
    case 4:
      return 89;
    case 5:
      return 120;
    case 6:
      return 150;
    case 7:
      return 181;
    case 8:
      return 212;
    case 9:
      return 243;
    case 10:
      return 273;
    case 11:
      return 304;
    case 12:
      return 334;
    default:
      return 0;
  }
};

const getNumberFromMonthIfLeapYear = (month) => {
  switch (month) {
    case 1:
      return 0;
    case 2:
      return 29;
    case 3:
      return 60;
    case 4:
      return 90;
    case 5:
      return 121;
    case 6:
      return 151;
    case 7:
      return 182;
    case 8:
      return 213;
    case 9:
      return 244;
    case 10:
      return 274;
    case 11:
      return 305;
    case 12:
      return 335;
    default:
      return 0;
  }
};

const getNumberFromCurrentDate = () => {
  const today = getCurrentDate();

  const year = +today.split('.').slice(2).join();
  const month = +today.split('.').slice(1, 2).join();
  const day = +today.split('.').slice(0, 1).join();

  return year % 4 === 0
    ? getNumberFromMonth(month) + day
    : getNumberFromMonthIfLeapYear(month) + day;
};

module.exports = {
  getCurrentDate,
  getNumberFromMonth,
  getNumberFromMonthIfLeapYear,
  getNumberFromCurrentDate,
};
