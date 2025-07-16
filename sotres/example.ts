import { defineStore } from 'pinia';

export const useExOptionsStore = defineStore('eosCounter', {
  // state: () => ({count: 1, name: 'yooHyeok'}),
  state: function () { // 함수 표현식
    return {
      count: 1,
      name: 'yooHyeok'
    }
  },
  /* state() {  // 함수 선언식
    return { count: 1, name: 'yooHyeok' }
  }, */
  getters: {
    doubleCount: (state) => state.count * 2,
    addState1: function(state): string { // 함수 표현식
      return state.count + state.name
    },
    addState2: function(state): string { // 함수 표현식 this 접근
      return this.count + this.name
    },
    addState3(state): string { // 함수 선언식
      return state.count + state.name
    },
    addState4(): string { // 함수 선언식 this 접근
      return this.count + this.name
    }
  },
  actions: {
    incrementA() { // 함수 선언식
      this.count ++;
    },
    incrementB: function() { // 함수 표현식
      this.count ++;
    },
    incrementC: () => {
      useExOptionsStore().count++
    },
    randomizeCounter() { // 함수 선언식
      this.count = Math.round(100 * Math.random())
    }
  }
})

export const useExSetupStore = defineStore('essCounter', () => {

  // State - ref, reactive로 정의
  const count = ref<number>(1);
  const name = ref<string>('yooHyeok');

  // Getters - computed 컴포저블을 통한 반환
  const doubleCount = computed(() => count.value * 2);
  const doublePlusOne = computed(() => count.value * 3);

  // Actions - 일반적인 함수 형태 정의
  const increment = () => count.value++;
  function randomizeCounter() {
    count.value = Math.round(100 * Math.random())
  }

  /* 모든 요소 및 함수 반환 */
  return {count, name, doubleCount, doublePlusOne, increment, randomizeCounter}
})