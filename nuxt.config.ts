// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          /* 전역적으로 사용되는 css의 상대경로 등록 및 관리 */
          additionalData: '@use "@/assets/scss/global.scss" as *;'
        }
      }
    }
  }
})
