import { handleApiRequest } from "@/utils";

export const getTipsHome = () => handleApiRequest("GET", "/api/article");
export const getTipDetail = (body: { slug: string }) =>
  handleApiRequest("POST", "/api/article/detail", body);
export const onLikeTip = (body: { articleId: string; commentId?: string }) =>
  handleApiRequest("POST", `/api/article/like?articleId=${body.articleId}`, body);
export const getComments = (articleId: string) =>
  handleApiRequest("GET", `/api/article/comments?articleId=${articleId}`);

export const getMyArticles = () =>
  handleApiRequest("GET", `/api/article/my-articles`);

export const onCreateComment = (body: { articleId: string; comment: string, parentCommentId: string }) =>
  handleApiRequest("POST", `/api/article/comments?articleId=${body.articleId}`, body);