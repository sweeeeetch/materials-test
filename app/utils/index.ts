export const formateTime = (date: string) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };
  return dateObj.toLocaleDateString("ru-RU", options);
};
