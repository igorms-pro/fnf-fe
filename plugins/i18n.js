import i18next from 'i18next'
import { defineNuxtPlugin } from '#imports'
import en from '~/assets/locales/en.json'
import ch from '~/assets/locales/ch.json'

const plugin = {
  install: async (app) => {
    await i18next.init({
      // TODO: set to false in production
      debug: true,

      ns: 'translation',
      defaultNS: 'translation',

      resources: {
        en,
        ch,
      },
    })

    app.config.globalProperties.$i18n = i18next
    app.config.globalProperties.$t = i18next.t
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin)
})
