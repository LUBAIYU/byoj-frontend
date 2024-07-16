<script setup lang="ts">
import { ref } from "vue";
import { userLoginAPI } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const rules = {
  userAccount: [
    { required: true, message: "请输入账号" },
    { minLength: 1, message: "账号长度不能小于1位" },
  ],
  userPassword: [
    { required: true, message: "请输入密码" },
    { minLength: 8, message: "密码长度不能小于8位" },
  ],
};

const form = ref<API.UserLoginParams>({
  userAccount: "",
  userPassword: "",
});

const doLogin = async () => {
  const res = await userLoginAPI(form.value);
  if (res.code === 200) {
    Message.success("登录成功");
    await router.push("/");
  } else {
    Message.error(res.message);
  }
};
</script>

<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px; text-align: center">用户登录</h2>
    <a-form
      :model="form"
      :rules="rules"
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      @submit-success="doLogin"
    >
      <a-form-item field="userAccount" label="账号" validate-trigger="blur">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" validate-trigger="blur">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" style="width: 250px"
          >登 录
        </a-button>
        <div style="text-align: center; margin-left: 40px">
          还没有账号？请
          <span
            style="color: #58a6d9; cursor: pointer"
            @click="$router.push('/user/register')"
            >注册</span
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
