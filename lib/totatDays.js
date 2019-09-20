function totalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getTime() - start.getTime()) / 86400000 + 1;
}

module.exports = totalDays;
