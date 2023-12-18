function parseDate(full) {
  const year = full.getFullYear();
  const month = ("0" + (full.getMonth() + 1)).slice(-2);
  const day = ("0" + full.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function lastMonth() {
  const day = new Date();
  const monthOfYear = day.getMonth() - 1;
  day.setMonth(monthOfYear);
  return day;
}

export { parseDate, lastMonth };
