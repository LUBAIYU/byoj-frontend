import type { RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    name: "用户登录",
    path: "/user/login",
    component: () => import("@/views/user/UserLoginView.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    name: "用户注册",
    path: "/user/register",
    component: () => import("@/views/user/UserRegisterView.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    name: "用户管理",
    path: "/user/manage",
    component: () => import("@/views/user/UserManageView.vue"),
  },
  {
    name: "题目管理",
    path: "/question/manage",
    component: () => import("@/views/question/QuestionManageView.vue"),
  },
  {
    name: "编辑题目",
    path: "/question/edit/:id",
    component: () => import("@/views/question/QuestionAddOrUpdateVIew.vue"),
    meta: {
      hidden: true,
    },
  },
];
