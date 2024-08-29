<script setup lang="ts">
import { ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { getUserByIdAPI, updateUserByIdAPI } from "@/api/user";
import moment from "moment";

interface Params {
  visible: boolean;
}

const props = withDefaults(defineProps<Params>(), {
  visible: false,
});

const formRef = ref(null);

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

const roleMenu = [
  {
    value: 0,
    label: "管理员",
  },
  {
    value: 1,
    label: "普通用户",
  },
];

const statusMenu = [
  {
    value: 0,
    label: "启用",
  },
  {
    value: 1,
    label: "禁用",
  },
];

const emit = defineEmits(["update:visible", "load:data"]);

const data = ref<API.User>({
  createTime: new Date(),
  email: "",
  id: 0,
  isDeleted: 0,
  salt: "",
  status: 0,
  updateTime: new Date(),
  userAccount: "",
  userName: "",
  userPassword: "",
  userRole: 0,
});

// 根据ID获取用户数据
const getUserById = async (id: number) => {
  if (!id) {
    return;
  }
  const res = await getUserByIdAPI(id);
  if (res.code === 200) {
    data.value = res.data;
  } else {
    Message.error(res.message);
  }
};

// 根据ID修改用户数据
const updateUserById = async () => {
  const res = await updateUserByIdAPI(data.value);
  if (res.code === 200) {
    Message.success("修改成功");
    emit("load:data");
  } else {
    Message.error(res.message);
  }
};

// 提交表单
const handleOk = () => {
  if (data.value.userAccount.length < 1 || data.value.userPassword.length < 8) {
    return;
  }
  updateUserById();
  handleCancel();
};

// 关闭对话框
const handleCancel = () => {
  data.value = {
    createTime: new Date(),
    email: "",
    id: 0,
    isDeleted: 0,
    salt: "",
    status: 0,
    updateTime: new Date(),
    userAccount: "",
    userName: "",
    userPassword: "",
    userRole: 0,
  };
  emit("update:visible", false);
};

defineExpose({
  getUserById,
});
</script>

<template>
  <div id="userUpdateView">
    <a-modal
      :visible="props.visible"
      title="用户信息编辑"
      ok-text="保存"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :model="data" :ref="formRef" :rules="rules" auto-label-width>
        <a-form-item field="id" label="ID">
          <a-input :model-value="data.id" readonly />
        </a-form-item>
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="data.userAccount" />
        </a-form-item>
        <a-form-item field="userPassword" label="密码">
          <a-input v-model="data.userPassword" />
        </a-form-item>
        <a-form-item field="userName" label="用户名">
          <a-input v-model="data.userName" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="data.email" />
        </a-form-item>
        <a-form-item field="userRole" label="用户角色">
          <a-select v-model="data.userRole">
            <a-option
              v-for="item in roleMenu"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </a-select>
        </a-form-item>
        <a-form-item field="status" label="用户状态">
          <a-select v-model="data.status">
            <a-option
              v-for="item in statusMenu"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </a-select>
        </a-form-item>
        <a-form-item field="createTime" label="创建时间">
          <a-input
            :model-value="moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')"
            readonly
          />
        </a-form-item>
        <a-form-item field="updateTime" label="更新时间">
          <a-input
            :model-value="moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')"
            readonly
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
