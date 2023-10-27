const monthMap: { [key: string]: string } = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "July",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const weekMap: { [key: string]: string } = {
  "0": "Sun",
  "1": "Mon",
  "2": "Tue",
  "3": "Wed",
  "4": "Thu",
  "5": "Fri",
  "6": "Sat",
};

export const formatDate = (date: Date, includeDayOfWeek: boolean): string => {
  const dateAsDate = new Date(date);
  const dayOfWeek = dateAsDate.getDay();
  const dateString = date.toString();
  const year = dateString.substring(0, 4);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(8, 10);

  if (includeDayOfWeek) {
    return `${weekMap[dayOfWeek]}, ${monthMap[month]} ${day}`;
  }
  return `${monthMap[month]} ${day}, ${year}`;
};
