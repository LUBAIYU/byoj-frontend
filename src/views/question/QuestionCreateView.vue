<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { createQuestionAPI } from "@/api/question";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref<API.QuestionCreateParams>({
  title: "",
  content: "",
  answer: "",
  tagList: [],
  judgeCaseDTOList: [],
  judgeConfigDTO: {
    timeLimit: 0,
    memoryLimit: 0,
  },
});

/**
 * 添加测试用例
 */
const handleAddJudgeCase = () => {
  form.value.judgeCaseDTOList.push({
    input: "",
    output: "",
  });
};

/**
 * 删除测试用例
 * @param index
 */
const handleDeleteJudgeCase = (index: number) => {
  form.value.judgeCaseDTOList.splice(index, 1);
};

const handleContentChange = (value: string) => {
  form.value.content = value;
};

const handleAnswerChange = (value: string) => {
  form.value.answer = value;
};

/**
 * 创建题目
 */
const createQuestion = async () => {
  const res = await createQuestionAPI(form.value);
  if (res.code === 200) {
    Message.success("创建成功");
    await router.push("/question/manage");
  } else {
    Message.error(res.message);
  }
};
</script>

<template>
  <div id="questionCreateView" style="margin-left: 40px">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="form.title"
          placeholder="请输入标题"
          style="width: 670px"
        />
      </a-form-item>
      <a-form-item field="tagList" label="题目标签">
        <a-input-tag
          v-model="form.tagList"
          allow-clear
          placeholder="请输入标签"
          style="width: 670px"
        />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="handleContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="题目答案">
        <MdEditor :value="form.answer" :handle-change="handleAnswerChange" />
      </a-form-item>
      <a-form-item field="judgeConfigDTO" label="判题配置">
        <a-space direction="vertical" style="min-width: 600px">
          <a-form-item field="judgeConfigDTO.timeLimit" label="时间限制（ms）">
            <a-input-number
              v-model="form.judgeConfigDTO.timeLimit"
              placeholder="请输入时间限制"
              :min="0"
              mode="button"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfigDTO.memoryLimit"
            label="内存限制（MB）"
          >
            <a-input-number
              v-model="form.judgeConfigDTO.memoryLimit"
              placeholder="请输入内存限制"
              :min="0"
              mode="button"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-prop="false"
      >
        <a-form-item
          v-for="(judgeCase, index) in form.judgeCaseDTOList"
          :key="index"
          no-style
        >
          <a-space
            direction="vertical"
            style="min-width: 480px; margin-right: 20px"
          >
            <a-form-item
              :field="`form.judgeCaseDTOList[${index}].input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCase.input"
                placeholder="请输入测试用例输入"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCaseDTOList[${index}].output`"
              :label="`输出用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCase.output"
                placeholder="请输入测试用例输出"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                status="danger"
                @click="handleDeleteJudgeCase(index)"
                >删除
              </a-button>
            </a-form-item>
          </a-space>
        </a-form-item>
        <div>
          <a-button type="outline" status="success" @click="handleAddJudgeCase"
            >添加测试用例
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="min-width: 200px"
          @click="createQuestion"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
