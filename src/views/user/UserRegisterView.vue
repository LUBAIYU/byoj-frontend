<script setup lang="ts">
import { ref } from "vue";
import { userRegisterAPI } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref<API.UserRegisterParams>({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});

const doRegister = async () => {
  const res = await userRegisterAPI(form.value);
  if (res.code === 200) {
    Message.success("注册成功");
    await router.push("/user/login");
  } else {
    Message.error(res.message);
  }
};
</script>

<template>
  <div id="userRegisterView">
    <h2 style="margin-bottom: 16px; text-align: center">用户注册</h2>
    <a-form
      :model="form"
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      @submit="doRegister"
    >
      <a-form-item
        field="userAccount"
        label="账号"
        :rules="[
          { required: true, message: '请输入账号' },
          { minLength: 1, message: '账号长度不能小于1位' },
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        :rules="[
          { required: true, message: '请输入密码' },
          { minLength: 8, message: '密码长度不能小于8位' },
        ]"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        label="确认密码"
        :rules="[
          { required: true, message: '请输入确认密码' },
          { minLength: 8, message: '确认密码长度不能小于8位' },
        ]"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请输入确认密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" style="width: 225px"
          >注 册
        </a-button>
        <div style="text-align: center; margin-left: 40px">
          已经有账号？去
          <span
            style="color: #58a6d9; cursor: pointer"
            @click="$router.push('/user/login')"
            >登录</span
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
