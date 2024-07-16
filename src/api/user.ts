import request from "@/util/request";

/**
 * 用户登录
 * @param data
 */
export const userLoginAPI = (data: API.UserLoginParams) => {
  return request({
    method: "POST",
    url: "/oj/user/login",
    data,
  }) as Promise<API.Result>;
};

/**
 * 用户注册
 * @param data
 */
export const userRegisterAPI = (data: any) => {
  return request({
    method: "POST",
    url: "/oj/user/register",
    data,
  }) as Promise<API.Result>;
};
