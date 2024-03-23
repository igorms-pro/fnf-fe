<template>
  <div
    v-if="langStore.forceRender"
    class="dark-mode dark-mode-duration min-h-screen bg-white"
  >
    <slot />
  </div>
</template>
<script>
import { usePreferredLanguages, useStorage } from '@vueuse/core'
import { useLang } from '~/stores/lang'

export default {
  setup() {
    const langStore = useLang()
    const userLangs = usePreferredLanguages()
    const storedLang = useStorage('user-lang')
    const setUserPreferredLang = () => {
      langStore.changeLang(
        storedLang.value !== 'undefined'
          ? storedLang.value
          : userLangs.value?.find((userLang) =>
              langStore.langs?.map(({ lang }) => lang).includes(userLang)
            ) ?? 'en'
      )
    }
    setUserPreferredLang()

    return {
      langStore,
    }
  },
}
</script>
