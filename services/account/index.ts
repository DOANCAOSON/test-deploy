import { handleApiRequest } from "@/utils";
import auth from "@/utils/auth";

export const getMe = () => handleApiRequest("GET", "/api/account/me");

export const onFollow = (userId: string) =>
  handleApiRequest("POST", `/api/account/follow?userId=${userId}`);

export const onUnFollow = (userId: string) =>
  handleApiRequest("POST", `/api/account/unfollow?userId=${userId}`);

export const onUpdateBio = (body: { bio: string }, onSuccess: () => void) =>
  handleApiRequest("POST", `/api/account/bio`, body, onSuccess);

export const onUpdateEmail = (body: { email: string }, onSuccess: () => void) =>
  handleApiRequest("POST", `/api/account/email`, body, onSuccess);

export const onUpdatePassword = (body: { password: string }, onSuccess: () => void) =>
  handleApiRequest("POST", `/api/account/password`, body, onSuccess);

export const onUpdateAvatar = (body: { binary: File }, onSuccess: () => void) =>
  handleApiRequest("POST", `/api/account/avatar`, body, onSuccess);

export const getFollowing = () =>
  handleApiRequest("GET", `/api/account/my-followings`);