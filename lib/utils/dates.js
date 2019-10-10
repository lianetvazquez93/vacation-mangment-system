function totalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getTime() - start.getTime()) / 86400000 + 1;
}

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

function emailDates(date) {
  let dateString = new Date(date).toUTCString();
  dateString = dateString
    .split(" ")
    .slice(0, 4)
    .join(" ");
  return dateString;
}

module.exports = {
  totalDays,
  businessDays,
  emailDates,
};
