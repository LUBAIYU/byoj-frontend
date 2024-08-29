<script setup lang="ts">
import { onMounted, ref } from "vue";
import moment from "moment";
import { listQuestionSubmitVosByPageAPI } from "@/api/question";
import { Message } from "@arco-design/web-vue";

const form = ref<API.QuestionSubmitPageParams>({
  language: "",
  questionName: "",
  current: 1,
  pageSize: 5,
});

const options = [
  {
    label: "Java",
    value: "java",
  },
  {
    label: "C++",
    value: "cpp",
  },
  {
    label: "Go",
    value: "go",
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "编程语言",
    dataIndex: "language",
    align: "center",
  },
  {
    title: "内存消耗（MB）",
    slotName: "memoryUsage",
    align: "center",
  },
  {
    title: "时间消耗（ms）",
    slotName: "timeUsage",
    align: "center",
  },
  {
    title: "状态",
    slotName: "status",
    align: "center",
  },
  {
    title: "题目",
    dataIndex: "questionName",
    align: "center",
  },
  {
    title: "用户名",
    dataIndex: "userName",
    align: "center",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
  },
];

const loadData = async () => {
  const res = await listQuestionSubmitVosByPageAPI(form.value);
  if (res.code === 200) {
    tableCount.value = res.data.total;
    tableData.value = res.data.records;
  } else {
    Message.error(res.message);
  }
};

const clearForm = () => {
  form.value = {
    language: "",
    questionName: "",
    current: 1,
    pageSize: 5,
  };
  loadData();
};

const tableCount = ref<number>(0);
const tableData = ref<API.QuestionSubmitVO[]>([]);

// 改变页码
const handleCurrentChange = (val: number) => {
  form.value.current = val;
  loadData();
};

// 改变每页记录数
const handleSizeChange = (val: number) => {
  form.value.pageSize = val;
  loadData();
};

onMounted(() => loadData());
</script>

<template>
  <div id="questionSubmitView">
    <a-form :model="form" layout="inline" style="margin-left: 20px">
      <a-form-item field="questionId" label="题目">
        <a-input v-model="form.questionName" placeholder="请输入题目" />
      </a-form-item>
      <a-form-item field="language" label="编程语言">
        <a-select
          v-model="form.language"
          placeholder="请选择编程语言"
          allow-clear
          style="width: 180px"
        >
          <a-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
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
      <template #memoryUsage="{ record }">
        {{ JSON.parse(record.judgeInfo)?.memoryUsage }}
      </template>
      <template #timeUsage="{ record }">
        {{ JSON.parse(record.judgeInfo)?.timeUsage }}
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.status === 0">等待中</a-tag>
        <a-tag v-if="record.status === 1" color="blue">判题中</a-tag>
        <a-tag v-if="record.status === 2" color="green">通过</a-tag>
        <a-tag v-if="record.status === 3" color="red">失败</a-tag>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </a-table>
    <a-pagination
      style="margin-top: 20px; margin-right: 10px; float: right"
      :total="tableCount"
      :current="form.current"
      :page-size="form.pageSize"
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
