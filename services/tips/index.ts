import { handleApiRequest } from "@/utils";

export const getTips = () => handleApiRequest("GET", "/api/tips");
export const getRanksTips = () => handleApiRequest("GET", "/api/tips/ranks");

export const onCreateTip = (body: TipData) =>
  handleApiRequest(
    "POST",
    `/api/article`,
    body
  );
