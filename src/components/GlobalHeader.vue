<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

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

// 跳转路由
const doMenuClick = (key: string) => {
  router.push(key);
};
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
    <a-col flex="100px">
      <div>哈哈哈</div>
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
