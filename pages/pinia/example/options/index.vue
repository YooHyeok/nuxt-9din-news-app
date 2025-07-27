<template>
  <div class="page">
    <div>
      <span>Pinia Store - options counter</span>
      <span>store.count: {{ store.count }}</span>
      <span>store.name: {{ store.name }}</span>
      <span>store.doubleCount: {{ store.doubleCount }}</span>
      <span>store.addState1: {{ store.addState1 }}</span>
      <span>store.addState2: {{ store.addState2 }}</span>
      <span>store.addState2: {{ store.addState3 }}</span>
      <span>store.addState2: {{ store.addState4 }}</span>
      <button @click="store.incrementA()">증가A</button>
      <button @click="store.incrementB()">증가B</button>
      <button @click="store.incrementC()">증가C</button>
      <button @click="store.randomizeCounter()">랜덤</button>
    </div>
    <div>
      <span>Pinia Store - options counter</span>
      <span>count: {{ count }}</span>
      <span>name: {{ name }}</span>
      <span>doubleCount: {{ doubleCount }}</span>
      <span>addState1: {{ addState1 }}</span>
      <span>addState2: {{ addState2 }}</span>
      <span>addState2: {{ addState3 }}</span>
      <span>addState2: {{ addState4 }}</span>
      <button @click="incrementA()">증가A</button>
      <button @click="incrementB()">증가B</button>
      <button @click="incrementC()">증가C</button>
      <button @click="randomizeCounter()">랜덤</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useExOptionsStore } from "~/stores/example"
const store = useExOptionsStore();
// const {count, name, doubleCount, addState1, addState2, addState3, addState4, incrementA, incrementB, incrementC} = store;
/**
 * pinia로 만들어진 store는 reactive로 래핑된 객체이다.
 * 이 말은 구조분해할당을 하면 state가 반응성을 읽게 된다.  
 * 구조분해 할당을 하고 나서도 state의 반응성을 유지하고 싶다면 pinia에서 vue의 toRefs와 동일한 기능을 제공하는 storeToRefs()를 사용해야 한다.
 * toRefs 함수는 반응형 state변수의 반응성을 유지하기 위해 사용하는 함수이다.  
 * 함수(메서드)는 반응형 데이터가 아니므로 ref로 변환하지 않기 때문에 actions는 store객체 자체에서 구조분해 할당을 하고, 
 * state는 store를 storeToRefs()의 매개변수로 전달하여 감싼 뒤 구조분해 할당 한다.
 */
const { incrementA, incrementB, incrementC, randomizeCounter } = store;
const {count, name, doubleCount, addState1, addState2, addState3, addState4} = storeToRefs(store);


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