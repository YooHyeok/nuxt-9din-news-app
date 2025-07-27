<template>
  <div class="page">
    <div>
      <span>Pinia Store - options counter</span>
      <span>store.count: {{ store.count }}</span>
      <span>store.name: {{ store.name }}</span>
      <span>store.doubleCount: {{ store.doubleCount }}</span>
      <span>store.doublePlusOne: {{ store.doublePlusOne }}</span>
      <button @click="store.increment()">증가</button>
      <button @click="store.randomizeCounter()">랜덤</button>
    </div>
    <div>
      <span>Pinia Store - options counter</span>
      <span>count: {{ count }}</span>
      <span>name: {{ name }}</span>
      <span>doubleCount: {{ doubleCount }}</span>
      <span>doublePlusOne: {{ doublePlusOne }}</span>
      <button @click="increment()">증가</button>
      <button @click="randomizeCounter()">랜덤</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useExSetupStore } from "~/stores/example"
const store = useExSetupStore();

const { increment, randomizeCounter } = store;
const {count, name, doubleCount, doublePlusOne} = storeToRefs(store);


</script>
<style lang="scss" scoped>
.page {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;

  width: calc(100% - 96px);

  gap: 24px;

  span {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 12px;
    width: 100%;
  }
}
</style>