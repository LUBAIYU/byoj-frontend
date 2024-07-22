import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes";
import { Message } from "@arco-design/web-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * 全局前置守卫
 */
router.beforeEach((to, from, next) => {
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
  // 校验是否有访问权限
  if (to.meta.access && to.meta.access === "admin") {
    // 获取token中存储的用户角色信息
    const payloadBase64Url = token?.split(".")[1];
    const payloadBase64 = payloadBase64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const payloadBinary = atob(payloadBase64);
    const payload = JSON.parse(payloadBinary);
    // 获取用户角色信息
    if (payload.role && payload.role !== 0) {
      Message.error("无权限访问");
      return;
    }
    // 允许访问
    next();
  }
});

export default router;
