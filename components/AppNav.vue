<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="nav in navItems" :key="nav.idx" class="nav__list__item">{{ nav.label }}</li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
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
    },
    {
        idx: 1,
        label: "비즈니스",
        value: "Business",
    },
    {
        idx: 2,
        label: "엔터테인먼트",
        value: "Entertainment",
    },
    {
        idx: 3,
        label: "건강",
        value: "Health",
    },
    {
        idx: 4,
        label: "과학",
        value: "Science",
    },
    {
        idx: 5,
        label: "스포츠",
        value: "Sports",
    },
    {
        idx: 6,
        label: "테크놀리지",
        value: "Technology",
    },
]);
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

      cursor: pointer;
    }

  }
}
</style>

