import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // 用户角色
  const role = ref<number>();
  // 设置用户角色
  const setRole = (val: number | undefined) => {
    role.value = val;
  };
  // 获取用户角色
  const getRole = () => {
    return role.value;
  };

  return {
    setRole,
    getRole,
  };
});
