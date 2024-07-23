import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * 解析Token获取用户角色信息
 * @param token
 */
const parseToken = (token: string) => {
  // 获取token中存储的用户角色信息
  const payloadBase64Url = token?.split(".")[1];
  const payloadBase64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payloadBinary = atob(payloadBase64);
  const payload = JSON.parse(payloadBinary);
  // 返回用户角色信息
  return payload?.role ?? 1;
};

/**
 * 全局前置守卫
 */
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  // 校验用户是否已登录
  const token = localStorage.getItem("token");
  // 判断当前页面是否为登录注册页
  if (to.path.includes("/login") || to.path.includes("/register")) {
    next();
    return;
  }
  // 先校验是否登录
  if (!token) {
    Message.error("请先登录");
    next("/user/login");
    return;
  }
  // 获取用户角色信息
  let role = userStore.getRole();
  // 如果不存在则解析token获取
  if (!role) {
    role = parseToken(token);
    userStore.setRole(role ?? 1);
  }
  // 校验是否有访问权限;
  if (to.meta.access && to.meta.access === "admin") {
    if (role !== 0) {
      Message.error("无权限访问");
      next(from);
      return;
    }
  }
  // 允许访问
  next();
});

export default router;
