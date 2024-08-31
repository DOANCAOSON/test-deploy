import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formattedDate = (
  inputDate: string,
  formatDate: string = "DD.MM HH:mm"
) => dayjs.utc(inputDate).tz("Asia/Ho_Chi_Minh").format(formatDate);
