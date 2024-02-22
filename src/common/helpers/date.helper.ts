export const getDate = (date: string) => {
  return date.toLowerCase().replace(/-/g, ".");
};

export const getDayOfWeek = (date: string): string => {
  const day = new Date(date);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[day.getDay()];
};

export const getDateString = (date: string): string => {
  const day = new Date(date);

  const dayOfWeek = getDayOfWeek(date);
  const formattedDate = `${dayOfWeek}(${day.getDate()}.${day.getMonth() + 1})`;

  return formattedDate;
};
