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
    meta: {
      access: "admin",
    },
  },
  {
    name: "题目管理",
    path: "/question/manage",
    component: () => import("@/views/question/QuestionManageView.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "编辑题目",
    path: "/question/edit/:id",
    component: () => import("@/views/question/QuestionUpdateView.vue"),
    meta: {
      hidden: true,
      access: "admin",
    },
  },
  {
    name: "创建题目",
    path: "/question/create",
    component: () => import("@/views/question/QuestionCreateView.vue"),
    meta: {
      access: "admin",
    },
  },
  {
    name: "浏览题目",
    path: "/question/browse",
    component: () => import("@/views/question/QuestionBrowseView.vue"),
  },
  {
    name: "在线做题",
    path: "/question/do/:id",
    component: () => import("@/views/question/QuestionDoView.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    name: "我的提交",
    path: "/question/submit",
    component: () => import("@/views/question/QuestionSubmitView.vue"),
  },
];
