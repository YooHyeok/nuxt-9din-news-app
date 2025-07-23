import { defineStore } from 'pinia';
import axios from "axios"
import type { Article } from '~/types/api';
export const useOptionsStore = defineStore('eosStore', {
  state: () => {return {}},
  getters: {
  },
  actions: {
  }
})

export const useSetupStore = defineStore('essStore', () => {

  // State - ref, reactive로 정의
  const searchValue = ref<string>('korea');
  const articleList = ref<Article[]>([]);

  // Getters - computed 컴포저블을 통한 반환

  // Actions
  /**
   * 네비게이션 메뉴 탭 클릭에 대한 news 유형 변경
   * Mutations => state를 변경할 목적으로 작성된 코드
   * @param payload const navItems = ref<Nav[]>([{...}])에 정의된 객체들 중 현재 선택된 객체의 value값
   */
  function changeSearchValue(payload: string) {
    searchValue.value = payload;
  }

  const getNews = async () => {
    const API_KEY = '446b34f1bd1f4a5db6088713c26e38b8';
    const API_URL = `https://newsapi.org/v2/everything?q=${searchValue.value}&from=2025-07-12&sortBy=popularity&apiKey=${API_KEY}`;

    try {
      const response = await axios.get(API_URL)
      articleList.value = response.data.articles;
      return response.data.articles;
    } catch(error) {
      console.error(error)
      articleList.value = [];
      return [];
    }
  }

  /* 모든 요소 및 함수 반환 */
  return { searchValue, articleList, changeSearchValue, getNews }
})