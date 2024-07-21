<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";

const plugins = [gfm(), highlight()];

/**
 * 定义组件属性
 */
interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
});
</script>

<template>
  <Viewer :value="props.value" :plugins="plugins" />
</template>

<style scoped></style>
