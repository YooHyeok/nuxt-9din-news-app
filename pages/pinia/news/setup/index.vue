<template>
  <div v-if="!isLoading" class="loading">
    <VueSpinnerIos size="48" color="red"/>
  </div>
  <div v-else class="page">
    <CardComponent v-for="article in data" :key="article.author" :data="article"/>
  </div>
</template>

<script setup lang="ts">
import { VueSpinnerIos } from 'vue3-spinners';
import CardComponent from '~/pages/components/Card.vue';
import type { Article } from '~/types/api';
import { useSetupStore } from '~/stores/api';

const store = useSetupStore();
const isLoading = ref(false)
const {data, pending, error, refresh} = useAsyncData<Article[]>("getNews", () => store.getNews());
onMounted(() => {
  isLoading.value = true
})
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
.loading {
  @include flex-center;
  width: calc(100% - 96px);

  padding: 48px;
  gap: 24px;
}
</style>