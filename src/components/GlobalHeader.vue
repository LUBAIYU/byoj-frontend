<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { routes } from "@/router/routes";
import { useUserStore } from "@/stores/userStore";
import { getUserId } from "@/util/token";
import { Message } from "@arco-design/web-vue";
import { getUserVoByIdAPI } from "@/api/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 当前登录用户
const loginUser = ref<API.UserVO>();

// 当前选中的菜单
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中菜单
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 可供选择的菜单
const visibleMenus = computed(() => {
  return routes.filter((route) => {
    if (route.meta?.hidden) {
      return false;
    }
    if (route.meta?.access && route.meta?.access === "admin") {
      const role = userStore.getRole();
      if (role !== 0) {
        return false;
      }
    }
    return true;
  });
});

// 获取登录用户
const getLoginUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    await router.push("/user/login");
    return;
  }
  const userId = getUserId(token);
  if (!userId) {
    Message.error("用户ID获取失败");
    return;
  }
  const res = await getUserVoByIdAPI(userId);
  if (res.code === 200) {
    loginUser.value = res.data;
  } else {
    Message.error(res.message);
  }
};

// 跳转路由
const doMenuClick = (key: string) => {
  router.push(key);
};

// 退出登录
const doLogout = () => {
  loginUser.value = undefined;
  localStorage.removeItem("token");
  localStorage.removeItem("expireTime");
  userStore.setRole(undefined);
  router.push("/user/login");
};

watch(visibleMenus, () => getLoginUser());
</script>

<template>
  <a-row id="globalHeader" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" alt="" src="@/assets/byoj-logo.png" />
            <div class="title">BY OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleMenus" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px" align="center">
      <a-dropdown>
        <div>{{ loginUser?.userName }}</div>
        <template #content>
          <a-doption>个人信息</a-doption>
          <a-doption @click="doLogout">退出登录</a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
