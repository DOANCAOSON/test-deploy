import { handleApiRequest } from "@/utils";

export const getMostReadArticles = () =>
  handleApiRequest("GET", "/api/news?orderType=3&pageIndex=0&pageSize=10");
export const getHotArticles = (categorySlug: string) =>
  handleApiRequest(
    "GET",
    `/api/news?categorySlug=${categorySlug}&isHot=true&pageIndex=0&pageSize=4`
  );
export const getNewArticles = (categorySlug: string) =>
  handleApiRequest("GET", `/api/news?categorySlug=${categorySlug}&pageIndex=0&pageSize=10`);
export const getNewsCategories = () =>
  handleApiRequest("GET", "/api/news/categories");
export const getNewsDetail = (body: { slug: string }) =>
  handleApiRequest("POST", "/api/news/detail", body);
