<template>
  <div class="page">
    <CardComponent v-for="article in data?.articles" :key="article.author" :data="article"/>
  </div>
</template>
<script setup lang="ts">
import CardComponent from '~/pages/components/Card.vue';
import type { ApiStructure } from '~/types/api';

const API_KEY = '446b34f1bd1f4a5db6088713c26e38b8';
const API_URL = `https://newsapi.org/v2/everything?q=Apple&from=2025-07-12&sortBy=popularity&apiKey=${API_KEY}`;

/**
 * [useAsyncData]: SSR(서버사이드렌더링) 방식 데이터 fetch Vue3의 Composable 이다.  
 * 
 * <Composable이란?>  
 * Vue의 Composition API를 활용하여 상태를 가진 로직을 캡슐화하고 재사용(공통)하는 함수를 말한다.  
 * React에서는 커스텀 훅이라는 용어를 사용하며, vue2에서는 composition api가 없기 때문에 mixin이나 vuex모듈로 공통 로직을 분리한다.  
 * 
 * <특징>
 * Vue3의 Composable 이므로 통신 후 결과 값은 컴포지션 api에서 사용하는 반응형 변수 ref로 감싸지게 된다.  
 * 캐싱 기능이 있다.  
 * 
 * <문법>  
 * - args1: `key` - 내부 캐시 및 상태 관리를 위한 고유 식별자.
 * - args2: `handler` - Promise값을 필수로 반환하는 비동기 콜백 함수.
 * 
 * [$fetch]: Nuxt3가 제공하는 서버와 비동기 통신을 하는 fetch 함수이다.  
 * axios와 같은 라이브러리로 ofetch 기반이다.  
 * 자동으로 JSON을 파싱하여 리턴해주며, 예외처리등의 후처리가 필요하지않아 편리하다.  
 */
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