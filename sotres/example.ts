import { defineStore } from 'pinia';

/**
 * 관례상 use키워드를 `useXxxStore`와 같이 store를 정의한 키워드 앞에 붙혀준다.  
 * [defineStore - options]
 * - pinia에서 store를 정의하는 메소드이다.
 * - args1: 앱 전체에서 사용될 해당 스토어가 갖는 고유한 아이디값으로 컴포넌트에서 호출할때 사용된다.
 * - args2: object형태로 store에 관련된 옵션을 정의한다.
 *   - `<state>`: 공식 문서에서는 화살표 함수 형태로 정의한다.  
 *      함수 선언식, 함수 표현식 모두 가능하다.
 *      Object 형식으로 state를 정의하고, 해당 Object를 return해줘야한다.
 *   - `<getters`>: 공식 문서에서는 화살표 함수 형태로 정의한다.  
 *      state를 매개변수로 받는다.  
 *      함수 선언식, 함수 표현식 모두 가능하며, state를 this키워드로 접근할 수 있다.
 *      계산된 값을 return해줘야 한다.
 *      타입스크립트 사용중 함수 선언식,표현식의 경우 strict모드가 true일 경우 반환타입을 정의해야한다.
 *      template 내에서는 반응형으로 동작하지만 setup 내에서는 computed로 감싸야 최신데이터를 가져올 수 있다.
 *   - `<actions`>: 공식 문서에서는 함수 선언식 형태로 정의한다.
 *      함수 표현식과 화살표 함수 모두 사용 가능하다.
 *      화살표 함수는는 state에 접근할 수 없으므로, useExOptionsStore()와 같이 자기자신을 참조하도록 하여 접근한다.
 *      함수 표현식에서는 state에는 this로 접근할 수 있다.
 * 
 */
export const useExOptionsStore = defineStore('eosCounter', {
  // state: () => ({count: 1, name: 'yooHyeok'}),
  state: function () {
    return {
      count: 1,
      name: 'yooHyeok'
    }
  },
  /* state() {
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
    addState4(): string { // 함수 선언식
      return this.count + this.name
    }
  },
  actions: {
    incrementA() {
      this.count ++;
    },
    incrementB: function() {
      this.count ++;
    },
    incrementC: () => {
      useExOptionsStore().count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    }
  }
})

/**
 * [defineStore - options]
 * - `<state>`: composition api 방식으로 선언한다.
 * - `<getters>`: computed 컴포저블을 활용한다.
 */
export const useExSetupStore = defineStore('essCounter', () => {
  const count = ref<number>(1);
  const name = ref<string>('yooHyeok');

  // Getters
  const doubleCount = computed(() => count.value * 2);
  const doublePlusOne = computed(() => count.value * 3);

  // Actions
  const increment = () => count.value++;
  function randomizeCounter() {
    count.value = Math.round(100 * Math.random())
  }

  return {count, name, doubleCount, doublePlusOne, increment, randomizeCounter}
})