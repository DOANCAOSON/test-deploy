import getFetchClient from "@/utils";
import auth from "@/utils/auth";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const handleApiRequest = async (
  endpoint: string,
  formData: any,
  onSuccess: (val: any) => void
) => {
  const fetchClient = getFetchClient();
  try {
    const res = (await fetchClient.post(
      endpoint,
      formData
    )) as AxiosResponse<Response>;
    toast(res.data.message, { type: "success", theme: "light" });
    onSuccess(res.data);
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Something went wrong! Please try again later";
    toast(message, { type: "error", theme: "light" });
  }
};

export const forgotPassWordUser = (formData: any, onSuccess: () => void) =>
  handleApiRequest("/api/forgot-password", formData, onSuccess);

export const registerUser = (formData: any, onSuccess: () => void) =>
  handleApiRequest("/api/register", formData, onSuccess);

export const SignInUser = (formData: any, onSuccess: () => void) => {
  const handleResponsive = ({
    data,
  }: {
    data: { jwt: JWT; userInfo: UserInfo };
  }) => {
    const options = {
      expires: new Date(data.jwt.accessTokenExpriesAt),
      secure: true,
      path: "/",
    };
    const refreshOptions = {
      expires: new Date(data.jwt.expiration),
      secure: true,
      path: "/",
    };
    auth.setToken(data.jwt.token, options);
    auth.setRefreshToken(data.jwt.refreshToken, refreshOptions);
    auth.setUserInfo(JSON.stringify(data.userInfo));
    onSuccess();
  };

  return handleApiRequest("/api/sign-in", formData, handleResponsive);
};
