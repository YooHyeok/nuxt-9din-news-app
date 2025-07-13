<template>
  <div class="card">
    <div class="card__image-box">
      <img v-if="data.urlToImage" :src="data.urlToImage" alt="" class="card__image-box__image">
      <div v-else class="card__image-box__noData">등록된 이미지가 없습니다.</div>
    </div>
    <div class="card__info-box">
      <div class="card__info-box__header">
        <div class="broadcast">
          <img :src="logo" alt="" class="broadcast__logo" />
          <span class="broadcast__company">{{ data.source.name }}</span>
        </div>
        <span class="title">{{ data.title }}</span>
      </div>
      <div class="card__info-box__body">
        <span class="contents">
          <!-- {{ data.content }} -->
          <span v-html="data.content"></span>
        </span>
      </div>
    </div>
    <div class="card__profile-box">
      <div class="card__profile-box__image-box">
        <img src="@/assets/icons/user.svg" alt="" class="image">
      </div>
      <div class="card__profile-box__detail">
        <span class="name">{{ data.author }}</span>
        <span class="date">{{ dayjs(data.publishedAt).format("YYYY-MM-DD HH:mm:ss") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { Article } from '~/types/api';

interface Props {
  data: Article;
}

/**
 * [Error] -  Cannot find name 'defineProps'.Vetur(2304)
 * Vue 3 + `<script setup>` 문법을 사용하고 있는데, Vetur 확장 또는 프로젝트 설정이 이를 제대로 인식하지 못해서 발생하는 문제이다.
 *
 * vetur는 Vue 2 중심의 Extention이고, script setup 문법을 완벽하게 지원하지 않는다.  
 * 따라서 volar을 설치하고 vetur을 지운다.  
 * 
 * 로컬 pc에서 Vue2 프로젝트를 사용하기 때문에 vscode상에서 현재 프로젝트에서만 vetur옵션을 꺼버린다. 
 * - tsconfi.json
 *   ```json 
 *   {
 *     "vetur.validation.template": false,
 *     "vetur.validation.style": false,
 *     "vetur.validation.script": false
 *   }
 *   ```
 */
const props = defineProps<Props>()
const { data } = toRefs(props)

const url = data.value.url;
const website = computed(() => {
  const result = url.split("https://")
  .pop() // 마지막 요소 제거 및 반환
  ?.split("/")[0] // "/"로 한번 더 분리후 앞부분만 사용
  return result;
})

const logo = computed(() => `http://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${website.value}&SIZE=16`)

</script>

<style lang="scss" scoped>
.card {
  @include flexbox(flex-start, center);
  flex-direction: column;

  width: calc(360px - 48px);
  height: 400px;

  padding: 24px;
  gap: 24px;

  background-color: $color-white-000;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  border: 0.5px solid $color-gray-000;
  border-radius: 16px;

  cursor: pointer;

  &__image-box {
    width: 100%;
    height: 192px;

    background-color: beige;
    border-radius: 12px;
  }
  &__info-box {
    @include flex-center;
    flex-direction: column;
    flex: 1;

    width: 100%;

    gap: 12px;

    &__header {
      @include flexbox(center, flex-start);
      flex-direction: column;

      width: 100%;

      .broadcast {
        @include flexbox(center, flex-start);
        width: 100%;

        gap: 8px;

        &__logo {
          width: 20px;
          height: 20px;

          border-radius: 50px;
          background-color: white;
        }
        &__company {
          @include flex-center;
          font-size: 12px;
        }
      }
      .title {
        @include flexbox(center, flex-start);
        width: 100%;
      }
    }
    &__body {
      .contents {
        font-size: 14px;
        color: $color-gray-350;
      }
    }
  }
  &__profile-box {
    @include flexbox(center, flex-start);
    width: 100%;
    height: 40px;

    gap: 12px;

    &__image-box {
      @include flex-center;

      .image {
        width: 32px;
        height: 32px;

        border-radius: 50%;
      }
    }
    &__detail {
      @include flexbox(flex-start, center);
      flex-direction: column;

      .name {
        font-size: 12px;
      }
      .date {
        font-size: 12px;
        color: $color-gray-350;
      }
    }
  }
}
</style>