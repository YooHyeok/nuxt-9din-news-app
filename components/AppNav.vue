<template>
  <div class="nav">
    <ul class="nav__list">
      <li class="nav__list__item">탭 이름</li>
      <li class="nav__list__item">탭 이름</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 88px;

  &__list { // &: 자기자신(nav) → &__list = nav__list
    display: flex;
    align-items: center;
    justify-content: center;
    
    list-style: none; // 도트 제거

    width: 100%;
    gap: 24px; // 사이 간격: 자녀 요소들이 일정한 간격으로 떨어져있을 수 있도록 설정할 때 사용

    &__item { // &: 자기자신(nav_list) → &__item = nav__list_item
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 6px 12px;

      background-color: $color-gray-200;
      border-radius: 20px;
      color: $color-black-700;

      cursor: pointer;
    }

  }
}
</style>

