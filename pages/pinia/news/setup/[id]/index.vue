<template>
  <div class="page">
    <CardComponent v-for="article in data" :key="article.author" :data="article"/>
  </div>
</template>

<script setup lang="ts">
import CardComponent from '~/pages/components/Card.vue';
import { useSetupStore } from '~/sotres/api';
import type { Article } from '~/types/api';

const route = useRoute();
const store = useSetupStore();

// 최초 진입시 store값 변경 + 데이터 fetch
store.changeSearchValue(String(route.params.id));
const {data, pending, error, refresh} = await useAsyncData<Article[]>("getNews", () => store.getNews());


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