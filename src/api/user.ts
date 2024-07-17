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
export const userRegisterAPI = (data: API.UserRegisterParams) => {
  return request({
    method: "POST",
    url: "/oj/user/register",
    data,
  }) as Promise<API.Result>;
};

/**
 * 获取用户列表（脱敏）
 * @param data
 */
export const listUserVOsByPageAPI = (data: API.UserPageParams) => {
  return request({
    method: "POST",
    url: "/oj/user/vo/page",
    data,
  }) as Promise<API.Result>;
};

/**
 * 获取用户列表
 * @param data
 */
export const listUsersByPageAPI = (data: API.UserPageParams) => {
  return request({
    method: "POST",
    url: "/oj/user/page",
    data,
  }) as Promise<API.Result>;
};

/**
 * 根据ID删除用户数据
 * @param id
 */
export const deleteUserByIdAPI = (id: number) => {
  return request({
    method: "DELETE",
    url: `/oj/user/${id}`,
  }) as Promise<API.Result>;
};

/**
 * 根据ID修改用户数据
 * @param data
 */
export const updateUserByIdAPI = (data: API.UserUpdateParams) => {
  return request({
    method: "PUT",
    url: "/oj/user/update",
    data,
  }) as Promise<API.Result>;
};

/**
 * 根据ID获取用户数据（脱敏）
 * @param id
 */
export const getUserVoByIdAPI = (id: number) => {
  return request({
    method: "GET",
    url: `/oj/user/vo/${id}`,
  }) as Promise<API.Result>;
};

/**
 * 根据ID获取用户数据
 * @param id
 */
export const getUserByIdAPI = (id: number) => {
  return request({
    method: "GET",
    url: `/oj/user/${id}`,
  }) as Promise<API.Result>;
};
