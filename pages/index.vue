<template>
  <div class="page">
    <CardUI />
  </div>
</template>
<script setup lang="ts">
import CardUI from '~/pages/components/Card.vue';

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