<template>
  <div class="page">
    <CardComponent v-for="article in store?.articleList" :key="article.author" :data="article"/>
  </div>
</template>

<script setup lang="ts">
import CardComponent from '~/pages/components/Card.vue';
import type { Article } from '~/types/api';

import { useSetupStore } from '~/sotres/api';
const store = useSetupStore();
await useAsyncData("getNews", () => store.getNews());

</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  width: calc(100% - 96px);

  padding: 48px;
  gap: 24px;
}
</style>