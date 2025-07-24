<template>
  <div class="page">
    <CardComponent v-for="article in data?.articles" :key="article.author" :data="article"/>
  </div>
</template>
<script setup lang="ts">
import CardComponent from '~/pages/components/Card.vue';
import type { ApiStructure } from '~/types/api';

const route = useRoute();

const API_KEY = '446b34f1bd1f4a5db6088713c26e38b8';
// const API_URL = `https://newsapi.org/v2/everything?q=Apple&from=2025-07-12&sortBy=popularity&apiKey=${API_KEY}`;
const API_URL = `https://newsapi.org/v2/everything?q=${route.params.id}&from=2025-07-12&sortBy=popularity&apiKey=${API_KEY}`;

const {data, pending, error, refresh} = await useAsyncData<ApiStructure>("getNews", () => $fetch(API_URL));
console.log(data.value)
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