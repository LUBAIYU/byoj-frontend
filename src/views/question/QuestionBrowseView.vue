<script setup lang="ts">
import { onMounted, ref } from "vue";
import { listQuestionVosByPageAPI } from "@/api/question";
import { Message } from "@arco-design/web-vue";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  id: undefined,
  title: "",
  tags: "",
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "标题",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "标签",
    slotName: "tagList",
    align: "center",
  },
  {
    title: "通过率",
    slotName: "acceptRate",
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

const current = ref<number>(1);
const pageSize = ref<number>(5);
const tableCount = ref<number>(0);
const tableData = ref<API.Question[]>([]);

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

// 清空数据
const clearForm = () => {
  form.value = {
    id: undefined,
    title: "",
    tags: "",
  };
  loadData();
};

// 加载数据
const loadData = async () => {
  const res = await listQuestionVosByPageAPI({
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

// 前往做题页面
const doQuestion = (id: number) => {
  router.push(`/question/do/${id}`);
};

onMounted(() => loadData());
</script>

<template>
  <div id="questionBrowseView">
    <a-form :model="form" style="margin-left: 20px" layout="inline">
      <a-form-item field="id" label="ID">
        <a-input v-model="form.id" placeholder="请输入ID" />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="width: 250px">
        <a-input v-model="form.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="margin-right: 20px" @click="loadData"
          >查 询
        </a-button>
        <a-button @click="clearForm">清 空</a-button>
      </a-form-item>
    </a-form>
    <a-table :data="tableData" :columns="columns">
      <template #tagList="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(item, index) in record.tagList"
            :key="index"
            color="green"
            >{{ item }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        {{
          record.submitNum != 0
            ? (record.acceptNum / record.submitNum) * 100
            : 0
        }}%
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #operation="{ record }">
        <a-button type="primary" @click="doQuestion(record.id)">做 题</a-button>
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
  </div>
</template>

<style scoped></style>
