import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const handleGetApiRequest = async (endpoint: string) => {
  const fetchClient = getFetchClient();
  
  try {
    const res = (await fetchClient.get(endpoint)) as AxiosResponse<Response>;
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Something went wrong! Please try again later";
    toast(message, { type: "error", theme: "light" });
  }
};

export const getPromotions = (categoryId: string) => handleGetApiRequest(`/api/promotion?categoryId=${categoryId}`);
export const getPromotionCategories = () => handleGetApiRequest("/promotion-categories");


