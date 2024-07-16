import axios from "axios";

/**
 * 统一请求配置
 */
const request = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
});

// 请求拦截器
request.interceptors.request.use();

// 响应拦截器
request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
