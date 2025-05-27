import dayjs from "dayjs";

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return "N/A";
  return dayjs(date).format("DD MMM YYYY, hh:mm A");
};
