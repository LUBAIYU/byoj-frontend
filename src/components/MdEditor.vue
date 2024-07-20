<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import Editor from "@bytemd/vue-next";

const plugins = [gfm(), highlight()];

/**
 * 定义组件属性
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  mode: "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<template>
  <Editor
    :value="props.value"
    :mode="props.mode"
    :plugins="plugins"
    @change="props.handleChange"
  />
</template>

<style scoped></style>
