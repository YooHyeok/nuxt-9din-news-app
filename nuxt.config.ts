// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  vite: {
    server: {
      // 개발 환경에서만 캐시 비활성화
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          /* 전역적으로 사용되는 css의 상대경로 등록 및 관리 */
          additionalData: '@use "@/assets/scss/global.scss" as *;'
        }
      }
    },
  },
  modules: ['@pinia/nuxt']
})
