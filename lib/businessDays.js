function businessDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  const current = start;
  while (current <= end) {
    let weekDay = current.getDay();
    if (!(weekDay === 0 || weekDay === 6)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}

module.exports = businessDays;
