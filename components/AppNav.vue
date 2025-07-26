<template>
  <nav class="nav">
    <ul class="nav__list">
      <!-- <li v-for="nav in navItems" :key="nav.idx" class="nav__list__item">{{ nav.label }}</li> -->
      <NuxtLink :to="`${fullPath}${nav.path}`" v-for="nav in navItems" :key="nav.idx" class="nav__list__item" :class="{active: nav.isClicked}">{{ nav.label }}</NuxtLink>
    </ul>
  </nav>
</template>
<script setup lang="ts">
/**
 * 동적 처리
 */
const url = useRequestURL()
const fullPath = computed(() => {
  const PINIA_NEWS_URL = 'pinia/news'
  if (url.pathname.includes('pinia')) {
    if (url.pathname.includes('setup')) {
      return `${url.origin}/${PINIA_NEWS_URL}/setup/`
    }
    return `${url.origin}/${PINIA_NEWS_URL}/option/`
  }
  return `${url.origin}/`
})

/**
 * 타입스크립트 4.5버전 이상부터는 verbatimModuleSyntax가 기본적으로 켜져있다.  
 * 값인지, 타입인지를 명확하게 구분지어야 하므로 type 키워드를 import시 추가해줘야한다.
 */
import type { Nav } from '~/types/nav';
const navItems = ref<Nav[]> ([
    {
        idx: 0,
        label: "일반시사",
        value: "General",
        path: "general",
        isClicked: false
    },
    {
        idx: 1,
        label: "비즈니스",
        value: "Business",
        path: "business",
        isClicked: false
    },
    {
        idx: 2,
        label: "엔터테인먼트",
        value: "Entertainment",
        path: "entertainment",
        isClicked: false
    },
    {
        idx: 3,
        label: "건강",
        value: "Health",
        path: "health",
        isClicked: false
    },
    {
        idx: 4,
        label: "과학",
        value: "Science",
        path: "science",
        isClicked: false
    },
    {
        idx: 5,
        label: "스포츠",
        value: "Sports",
        path: "sports",
        isClicked: false
    },
    {
        idx: 6,
        label: "테크놀리지",
        value: "Technology",
        path: "technology",
        isClicked: false
    },
]);
const route = useRoute();
// 변동된 페이지 라우터 즉, URI 값을 감지해서 네비게이션 UI를 동적으로 변동되도록 하는 코드
watch(
    () => route.params?.id,
    (n, o) => {
      navItems.value.forEach((item: Nav) => {
          const path = item.path;
          if ((n === undefined && path === 'general') || n === path) item.isClicked = true;
          else item.isClicked = false;
      });
    },
    { immediate: true } // 컴포넌트 마운트 시에도 실행
);
</script>
<style lang="scss" scoped>
.nav {
  @include flex-center;

  width: 100%;
  margin-top: 88px;

  &__list { // &: 상위(nav) → &__list = nav__list
    @include flex-center;
    
    list-style: none; // 도트 제거

    width: 100%;
    gap: 24px; // 사이 간격: 자녀 요소들이 일정한 간격으로 떨어져있을 수 있도록 설정할 때 사용

    &__item { // &: 상위(nav_list) → &__item = nav__list_item
      @include flex-center;

      padding: 6px 12px;

      background-color: $color-gray-200;
      border-radius: 20px;
      text-decoration: none;

      cursor: pointer;

      &.active {
        background-color: #494949;
        color: $color-white-000;
      }
    }

  }

}
</style>

