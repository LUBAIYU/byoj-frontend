<script setup lang="ts">
import { onMounted, ref } from "vue";
import { deleteUserByIdAPI, listUserVOsByPageAPI } from "@/api/user";
import { Message } from "@arco-design/web-vue";
import moment from "moment";
import UserUpdateView from "@/views/user/UserUpdateView.vue";

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

const form = ref({
  id: undefined,
  userName: "",
  status: undefined,
});

// 表格数据列
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
    align: "center",
  },
  {
    title: "用户名",
    dataIndex: "userName",
    align: "center",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    align: "center",
  },
  {
    title: "角色",
    slotName: "userRole",
    align: "center",
  },
  {
    title: "状态",
    slotName: "status",
    align: "center",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
  },
  {
    title: "更新时间",
    slotName: "updateTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "operation",
    align: "center",
  },
];

const modalRef = ref(null);
const visible = ref(false);
const current = ref<number>(1);
const pageSize = ref<number>(5);
const tableCount = ref<number>(0);
const tableData = ref<API.UserVO[]>([]);

// 关闭对话框
const closeModal = () => {
  visible.value = false;
};

// 改变页码
const handleCurrentChange = (val: number) => {
  current.value = val;
  loadData();
};

// 改变每页记录数
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadData();
};

// 清空表单
const clearForm = () => {
  form.value = {
    id: undefined,
    userName: "",
    status: undefined,
  };
  loadData();
};

// 获取表格数据
const loadData = async () => {
  const res = await listUserVOsByPageAPI({
    ...form.value,
    current: current.value,
    pageSize: pageSize.value,
  });
  if (res.code === 200) {
    tableCount.value = res.data.total;
    tableData.value = res.data.records;
  } else {
    Message.error(res.message);
  }
};

// 删除用户数据
const deleteUser = async (id: number) => {
  const res = await deleteUserByIdAPI(id);
  if (res.code === 200) {
    Message.success("删除成功");
    await loadData();
  } else {
    Message.error(res.message);
  }
};

// 点击编辑按钮
const editUser = (id: number) => {
  visible.value = true;
  modalRef.value?.getUserById(id);
};

onMounted(() => loadData());
</script>

<template>
  <div id="userManageView">
    <a-form :model="form" style="margin-left: 20px" layout="inline">
      <a-form-item field="id" label="ID">
        <a-input v-model="form.id" placeholder="请输入ID" />
      </a-form-item>
      <a-form-item field="userName" label="用户名">
        <a-input v-model="form.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="status" label="用户状态" style="width: 250px">
        <a-select
          v-model="form.status"
          placeholder="请输入用户状态"
          allow-clear
        >
          <a-option
            v-for="item in statusMenu"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          />
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="margin-right: 20px" @click="loadData"
          >查 询
        </a-button>
        <a-button @click="clearForm">清 空</a-button>
      </a-form-item>
    </a-form>
    <a-table :data="tableData" :columns="columns">
      <template #userRole="{ record }">
        {{ record.userRole === 0 ? "管理员" : "普通用户" }}
      </template>
      <template #status="{ record }">
        <a-tag :color="record.status === 0 ? 'green' : 'red'">
          {{ record.status === 0 ? "启用" : "禁用" }}
        </a-tag>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #operation="{ record }">
        <a-button type="text" @click="editUser(record.id)">编 辑</a-button>
        <a-popconfirm content="确定删除吗？" @ok="deleteUser(record.id)">
          <a-button type="text" status="danger">删 除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-pagination
      style="margin-top: 20px; margin-right: 10px; float: right"
      :total="tableCount"
      :current="current"
      :page-size="pageSize"
      :page-size-options="[5, 10, 15, 20]"
      @change="handleCurrentChange"
      @page-size-change="handleSizeChange"
      show-total
      show-jumper
      show-page-size
    />
    <user-update-view
      ref="modalRef"
      :visible="visible"
      @update:visible="closeModal"
      @load:data="loadData"
    />
  </div>
</template>

<style scoped></style>
