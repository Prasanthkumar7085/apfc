import dayjs from "dayjs";

const formatDate = (timeString: string, format: string) => {
  if (timeString) {
    if (timeString === "Invalid date" || timeString === "-") {
      return "-";
    } else {
      let date = dayjs(timeString).format(format);
      return date;
    }
  }
  return "-";
};

export default formatDate;
