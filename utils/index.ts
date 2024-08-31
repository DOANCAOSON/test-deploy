import dayjs from "dayjs";
import instance, { RequestConfig } from "./fetchClient";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const addPrependingSlash = (url: string) =>
  typeof url === "string" && url.charAt(0) !== "/" ? `/${url}` : url;

//This regular expression matches a string that starts with either "http://" or "https://" or any other protocol name in lower case letters, followed by "://" and ends with anything else
const hasProtocol = (url: string) =>
  new RegExp("^(?:[a-z+]+:)?//", "i").test(url);

// check if the url has a prepending slash, if not it adds the slash
const normalizeUrl = (url: string) =>
  hasProtocol(url) ? url : addPrependingSlash(url);

const getFetchClient = (defaultOptions = {}) => {
  instance.defaults.baseURL = process.env.BACKEND_ENDPOINT;
  return {
    get: (url: string, config?: RequestConfig) =>
      instance.get(normalizeUrl(url), { ...defaultOptions, ...config }),
    put: (url: string, data?: unknown, config?: RequestConfig) =>
      instance.put(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    patch: (url: string, data?: unknown, config?: RequestConfig) =>
      instance.patch(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    post: (url: string, data?: unknown, config?: RequestConfig) =>
      instance.post(normalizeUrl(url), data, { ...defaultOptions, ...config }),
    del: (url: string, config?: RequestConfig) =>
      instance.delete(normalizeUrl(url), { ...defaultOptions, ...config }),
    export: (url: string, config?: RequestConfig) =>
      instance.get(normalizeUrl(url), {
        ...defaultOptions,
        ...config,
        responseType: "blob",
      }),
  };
};
export const convertTimestampToDate = ({ matchAt, status }: any) => {
  let displayTime: string | number = "";
  let textColor: string = "#000000";

  const matchStartTime = dayjs(matchAt);

  if (status === 3 || status === 1) {
    const currentTime = dayjs();
    const elapsedMinutes = currentTime.diff(matchStartTime, "minute");

    if (elapsedMinutes > 90) {
      displayTime = `90+`;
    } else {
      displayTime = elapsedMinutes;
    }
    textColor = "#ff0046";
  } else if (status === -1) {
    displayTime = "Kết thúc";
  } else if (status === -14) {
    displayTime = "Hoãn";
  } else if (status === 2 || status === 0) {
    displayTime = matchStartTime.format("HH:mm");
  } else {
    displayTime = "N/A";
  }

  const time =
    status === 3 || status === 1
      ? `<div class='text-[${textColor}] font-semibold'>${displayTime}<span class="animate-blink ml-[2px]">'</span></div>`
      : `<span>${displayTime}</span>`;

  return time;
};

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD/MM/YYYY HH:mm');
};

export const fromNow = (dateString: string) => {
  return dayjs(dateString).fromNow();
};

export const handleApiRequest = async <T>(
  method: "GET" | "POST",
  endpoint: string,
  data?: any,
  onSuccess?: () => void
) => {
  const fetchClient = getFetchClient();

  try {
    let res: AxiosResponse<any>;

    if (method === "GET") {
      res = (await fetchClient.get(endpoint)) as AxiosResponse<T>;
    } else if (method === "POST") {
      res = (await fetchClient.post(endpoint, data)) as AxiosResponse<T>;
      toast(res.data.message, { type: "success", theme: "light" });
      onSuccess?.()
    } else {
      throw new Error("Unsupported method");
    }
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Something went wrong! Please try again later";
    toast(message, { type: "error", theme: "light" });
    throw error;
  }
};

export default getFetchClient;
