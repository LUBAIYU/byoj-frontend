<script setup lang="ts">
import { onMounted, ref } from "vue";
import moment from "moment";
import { listQuestionSubmitVosByPageAPI } from "@/api/question";
import { Message } from "@arco-design/web-vue";

const form = ref<API.QuestionSubmitPageParams>({
  language: "",
  questionId: undefined,
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
    title: "判题信息",
    slotName: "judgeInfo",
    align: "center",
  },
  {
    title: "状态",
    slotName: "status",
    align: "center",
  },
  {
    title: "题目ID",
    dataIndex: "questionId",
    align: "center",
  },
  {
    title: "用户ID",
    dataIndex: "userId",
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
    questionId: undefined,
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
      <a-form-item field="questionId" label="题目ID">
        <a-input v-model="form.questionId" placeholder="请输入题目ID" />
      </a-form-item>
      <a-form-item field="language" label="编程语言">
        <a-select
          v-model="form.language"
          placeholder="请选择编程语言"
          allow-clear
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
      <template #judgeInfo="{ record }">
        {{ record.judgeInfo }}
      </template>
      <template #status="{ record }">
        {{ record.status }}
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
