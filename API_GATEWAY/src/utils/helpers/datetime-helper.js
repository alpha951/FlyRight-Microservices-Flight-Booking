function compareTime(timeString1, timeString2) {
  let DATE1 = new Date(timeString1);
  let DATE2 = new Date(timeString2);
  return DATE1.getTime() > DATE2.getTime();
}

module.exports = {
  compareTime,
};
