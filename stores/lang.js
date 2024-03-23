import { defineStore } from 'pinia'
import i18next from 'i18next'
import { useStorage } from '@vueuse/core'

const storedLang = useStorage('user-lang')
const langs = [
  { title: 'English', code: 'EN', lang: 'en' },
  { title: '中國人', code: 'CH', lang: 'ch' },
]

export const useLang = defineStore('lang', {
  state: () => {
    return {
      lang: 'en',
      langs,
      forceRender: true,
    }
  },

  getters: {
    currentLang: (state) => langs.find((lang) => lang.lang === state.lang),
  },

  actions: {
    async changeLang(newLang) {
      if (langs.findIndex(({ lang }) => lang === newLang) === -1) {
        console.warn(
          `Lang "${newLang}" not supported, fallback to default: "en"`
        )
        return null
      }

      this.forceRender = false
      const res = await i18next.changeLanguage(newLang)
      this.lang = newLang
      storedLang.value = newLang
      this.forceRender = true
      return res
    },
  },
})
