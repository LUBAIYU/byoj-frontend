<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { getQuestionVoByIdAPI } from "@/api/question";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const route = useRoute();

const question = ref<API.QuestionVO>({
  id: 0,
  title: "",
  content: "",
  tagList: [],
  judgeConfigVO: {
    timeLimit: 0,
    memoryLimit: 0,
  },
  submitNum: 0,
  acceptNum: 0,
  createTime: "",
  updateTime: "",
});

const form = ref({
  code: "",
  language: "",
  questionId: route.params.id ?? 0,
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

const loadData = async () => {
  const id = route.params.id;
  if (!id) {
    Message.error("路径参数异常");
    return;
  }
  const res = await getQuestionVoByIdAPI(id);
  if (res.code === 200) {
    question.value = res.data;
  } else {
    Message.error(res.message);
  }
};

const handleCodeChange = (value: string) => {
  form.value.code = value;
};

onMounted(() => loadData());
</script>

<template>
  <div id="questionDoView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 2 }"
              >
                <a-descriptions-item label="时间限制（ms）">
                  {{ question.judgeConfigVO.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制（MB）">
                  {{ question.judgeConfigVO.memoryLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space>
                  <a-tag
                    v-for="(item, index) in question.tagList"
                    :key="index"
                    color="green"
                    >{{ item }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="answer" title="答案"></a-tab-pane>
          <a-tab-pane key="comment" title="评论区"></a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="language" label="编程语言" style="width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="请输入编程语言"
            >
              <a-option
                v-for="item in options"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="handleCodeChange"
        />
        <a-button
          type="primary"
          style="width: 240px; margin-top: 10px; float: right"
          >提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped></style>
