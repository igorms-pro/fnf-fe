<template>
  <div>
    <Head>
      <Title>{{ HEAD_TITLE }}</Title>
      <Meta
        property="og:description"
        :content="$t('searchEngine.metaDescription')"
      />
      <Meta property="og:title" :content="$t('searchEngine.metaTitle')" />
      <Meta
        property="og:image"
        content="https://assets.fewfar.com/Link_Image_Preview.jpeg"
      />
    </Head>
    <div
      v-if="langStore.forceRender"
      class="dark-mode dark-mode-duration min-h-screen bg-white"
    >
      <TheNavBar />
      <slot />
      <TheFooter></TheFooter>
      <WidgetsGroove />
    </div>
  </div>
</template>

<script>
import { usePreferredLanguages, useStorage } from '@vueuse/core'
import { useLang } from '~/stores/lang'
import { useUser } from '~/stores/user'
import { useCollections } from '~/stores/collections'

export default {
  setup() {
    const HEAD_TITLE = 'Few and Far - NFT Marketplace'
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

    const userStore = useUser()
    const collectionsStore = useCollections()

    onMounted(async () => {
      await userStore.init()
      await collectionsStore.fetchCollectionExplorerId()
    })

    return {
      HEAD_TITLE,
      langStore,
    }
  },
}
</script>
