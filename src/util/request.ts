import axios from "axios";

/**
 * 统一请求配置
 */
const request = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 获取token
    const token = localStorage.getItem("token");
    // 如果有token，则添加到请求头中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
