import VueGtag from 'vue-gtag'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    VueGtag,
    {
      config: {
        id: 'G-1S01E0XCSR',
      },
    },
    nuxtApp.$router
  )
})
