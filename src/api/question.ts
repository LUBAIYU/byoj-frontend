import request from "@/util/request";

/**
 * 创建题目
 * @param data
 */
export const createQuestionAPI = (data: API.QuestionCreateParams) => {
  return request({
    method: "POST",
    url: "/oj/question/create",
    data,
  }) as Promise<API.Result>;
};

/**
 * 根据ID删除题目
 * @param id
 */
export const deleteQuestionByIdAPI = (id: number) => {
  return request({
    method: "DELETE",
    url: `/oj/question/${id}`,
  }) as Promise<API.Result>;
};

/**
 * 根据ID修改题目
 * @param data
 */
export const updateQuestionByIdAPI = (data: API.QuestionUpdateParams) => {
  return request({
    method: "PUT",
    url: "/oj/question/update",
    data,
  }) as Promise<API.Result>;
};

/**
 * 根据ID获取题目（完整）
 * @param id
 */
export const getQuestionByIdAPI = (id: number) => {
  return request({
    method: "GET",
    url: `/oj/question/${id}`,
  }) as Promise<API.Result>;
};

/**
 * 根据ID获取题目（脱敏）
 * @param id
 */
export const getQuestionVoByIdAPI = (id: number) => {
  return request({
    method: "GET",
    url: `/oj/question/vo/${id}`,
  }) as Promise<API.Result>;
};

/**
 * 分页获取题目列表
 */
export const listQuestionsByPageAPI = (data: API.QuestionPageParams) => {
  return request({
    method: "POST",
    url: "/oj/question/page",
    data,
  }) as Promise<API.Result>;
};

/**
 * 分页获取题目列表（脱敏）
 */
export const listQuestionVosByPageAPI = (data: API.QuestionPageParams) => {
  return request({
    method: "POST",
    url: "/oj/question/vo/page",
    data,
  }) as Promise<API.Result>;
};
