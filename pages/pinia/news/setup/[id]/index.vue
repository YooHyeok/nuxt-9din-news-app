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
import { useSetupStore } from '~/sotres/api';
import type { Article } from '~/types/api';

const route = useRoute();
const store = useSetupStore();
// 최초 진입시 store값 변경 + 데이터 fetch
store.changeSearchValue(String(route.params.id));
const {data, pending, error, refresh} = await useAsyncData<Article[]>("getNews", () => store.getNews());
const isLoading = ref(false)
onMounted(() => {
  /* hydration에서는 로딩바를 표현하는 방법이 컴포넌트가 마운트되었을때가 데이터 패칭을 완료한것으로 간주한다. */
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