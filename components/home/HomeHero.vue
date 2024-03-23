<template>
  <section class="relative">
    <div class="absolute inset-0">
      <img
        src="~/assets/images/backgrounds/mask-radial-header-home-page.svg"
        alt="mask-radial-header-home-page"
        class="w-full object-cover"
      />
    </div>
    <div class="overflow-hidden">
      <div class="container w-full px-5 pt-5 md:px-14 md:pt-0 lg:px-32">
        <div class="relative">
          <div class="w-full md:absolute md:top-6 md:pt-0 lg:top-12">
            <div
              class="relative z-10 w-full rounded-lg shadow-md md:mx-auto md:w-[496px]"
            >
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5"
              >
                <span class="text-gray-500 z-10 sm:text-sm">
                  <IconSearch></IconSearch>
                </span>
              </div>
              <input
                type="text"
                readonly
                class="dark-mode dark-mode-duration block w-full rounded-lg border-2 border-transparent py-3.5 pl-12 pr-5 text-sm hover:border-purple focus:border-purple focus:outline-none focus:ring-purple active:border-purple dark:border dark:border-grey-300 dark:hover:border-purple md:py-4 md:text-base"
                :placeholder="$t('search.homePlaceHolder')"
                @click.prevent="setSearchModalOpen(true)"
              />
            </div>
          </div>
          <img
            v-if="!isDark"
            class="md:animate-vibrate-slowly relative top-2 mx-auto scale-125 md:top-16 md:transform-none lg:h-[457px]"
            src="~/assets/images/backgrounds/island_light.png"
            alt="Few and Far illustration"
          />
          <img
            v-else
            class="md:animate-vibrate-slowly relative top-2 mx-auto scale-125 md:top-16 md:transform-none lg:h-[457px]"
            src="~/assets/images/backgrounds/island_dark.png"
            alt="Few and Far illustration"
          />
          <h1
            class="mx-auto mt-14 mb-5 w-full text-center text-[27px] font-extrabold leading-8 md:my-10 md:text-[53px] md:leading-[62px]"
          >
            <h1 class="main-title" v-html="$t('home.hero.title')"></h1>
          </h1>
          <div class="flex justify-center space-x-5 md:mt-10">
            <nuxt-link
              v-if="isSignedIn"
              :to="{ name: 'user-profile' }"
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg font-bold"
            >
              {{ $t('nft.list') }}
            </nuxt-link>
            <button
              v-else
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg font-bold"
              @click="openConnectModal('/user-profile')"
            >
              {{ $t('nft.list') }}
            </button>

            <a
              class="btn btn-brand btn-border-b btn-base btn-center btn-lg dark:btn-brand-dark border-2 border-b-4 font-bold"
              href="#featureCollection"
            >
              {{ $t('nft.exploreNFTs') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useDark } from '#imports'

import IconSearch from '~/assets/images/icons/search-icon.svg?component'
import { useCollections } from '~/stores/collections'

export default {
  components: {
    IconSearch,
  },

  setup() {
    const {
      $near: { isSignedIn },
    } = useNuxtApp()

    const { isDark } = useDark()

    const collectionsStore = useCollections()
    const collectionExplorerId = computed(
      () => collectionsStore.collectionExplorerId ?? null
    )

    const { setShowDialog: setSearchModalOpen } = useSearchDialogState()
    const { openDialog: openConnectModal } = useConnectDialogState()

    return {
      isDark,

      collectionExplorerId,

      isSignedIn,

      setSearchModalOpen,
      openConnectModal,
    }
  },
}
</script>
