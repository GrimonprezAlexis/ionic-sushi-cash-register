import dayjs from "dayjs";
import "dayjs/locale/fr";

export const containsSubArray = (
  mainArray: any[],
  subArray: { [x: string]: any }
) => {
  return mainArray.some((arr) =>
    arr.every(
      (element: any, index: string | number) => element === subArray[index]
    )
  );
};

export const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000);
  const uniqueId = `${timestamp}-${randomNum}`;
  return uniqueId;
};

export const formatTime = (
  isoDate: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  return dayjs(isoDate).format("dddd HH:mm"); // Format "Lundi hh:mm"
};

export const calculateElapsedTime = (
  isoDate: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  const start = dayjs(isoDate);
  const end = dayjs();

  const secondsDiff = end.diff(start, "second");
  const minutesDiff = end.diff(start, "minute");
  const hoursDiff = end.diff(start, "hour");
  const daysDiff = end.diff(start, "day");

  if (daysDiff > 0) {
    return `${daysDiff} jour${daysDiff > 1 ? "s" : ""} ago`;
  } else if (hoursDiff > 0) {
    return `${hoursDiff} heure${hoursDiff > 1 ? "s" : ""} ago`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
  } else {
    return `${secondsDiff} seconde${secondsDiff > 1 ? "s" : ""} ago`;
  }
};
