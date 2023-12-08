function parseDate(full) {
  const year = full.getFullYear();
  const month = ("0" + (full.getMonth() + 1)).slice(-2);
  const day = ("0" + full.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function lastMonth() {
  const today = new Date();
  const monthOfYear = today.getMonth() - 1;
  today.setMonth(monthOfYear);
  return today;
}

export { parseDate, lastMonth };
