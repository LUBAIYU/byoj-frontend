<script setup lang="ts">
import { ref } from "vue";

const form = ref({});
</script>

<template>
  <div id="questionSubmitView">
    <a-form :model="form"> </a-form>
  </div>
</template>

<style scoped></style>
