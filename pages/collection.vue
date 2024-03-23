<template>
  <div>
    <div v-if="!pending">
      <section v-if="collection" class="relative overflow-hidden">
        <img
          v-if="isDark"
          src="~/assets/images/backgrounds/mask-collection-dark.png"
          class="absolute inset-0 z-10 h-full w-full"
        />
        <img
          v-else
          src="~/assets/images/backgrounds/mask-collection.png"
          class="absolute inset-0 z-10 h-full w-full"
        />
        <div
          v-if="collection.cover || collection.media"
          class="absolute inset-0 bg-center opacity-10"
          :style="`background-image: url('${
            collection.cover || collection.media
          }')`"
        ></div>
        <div class="relative z-20 bg-white/30 dark:bg-black/30">
          <div
            class="container py-6 text-center lg:flex lg:justify-between lg:space-x-20 lg:py-20"
          >
            <div class="lg:flex lg:w-1/2 lg:space-x-7 lg:text-left">
              <BaseImg
                v-if="collection.cover || collection.media"
                :media="collection.media || collection.icon"
                :alt="collection.name"
                class="shadow-box dark-mode mx-auto h-36 w-36 rounded-lg bg-white lg:ml-0 lg:h-44 lg:w-44"
                :img-set="
                  createImageSet({
                    256: collection.media256,
                    512: collection.media512,
                    1024: collection.media1024,
                  })
                "
              />
              <div>
                <h1 class="title mt-4 text-2xl lg:mt-0">
                  {{ collection.name }}
                </h1>
                <VTooltip
                  class="inline-flex"
                  placement="right"
                  :triggers="[]"
                  :shown="copied"
                >
                  <button
                    class="btn-base btn-white shadow-box btn-center btn btn-border-purple pd-4 rounded-lg border-2 px-4 font-semibold"
                    :class="{ 'text-purple': collection.isVerified }"
                    @click="copy(collection.accountId)"
                  >
                    {{ collection.accountId }}
                    <IconVerifiedMacaron
                      v-if="collection.isVerified"
                      class="flex-none"
                      :alt="$t('collection.verifiedCollection')"
                    ></IconVerifiedMacaron>
                    <IconCopy class="ml-3"></IconCopy>
                  </button>
                  <template #popper> {{ $t('common.state.copied') }}</template>
                </VTooltip>
                <div
                  class="mt-4 flex justify-center space-x-2.5 lg:justify-start"
                >
                  <nuxt-link
                    v-if="collection?.socialMedia?.website"
                    :href="collection.socialMedia.website"
                    :alt="collection.name"
                    target="_blank"
                    class="btn btn-icon-sm shadow-box btn-border-purple btn-white btn-center border"
                  >
                    <IconI18n></IconI18n>
                  </nuxt-link>
                  <nuxt-link
                    v-if="collection?.socialMedia?.twitter"
                    :href="`${collection.socialMedia.twitter}`"
                    :alt="collection.name"
                    target="_blank"
                    class="btn btn-icon-sm shadow-box btn-border-purple btn-white btn-center border"
                  >
                    <IconTwitter></IconTwitter>
                  </nuxt-link>
                  <nuxt-link
                    v-if="collection?.socialMedia?.discord"
                    :href="`${collection.socialMedia.discord}`"
                    :alt="collection.name"
                    target="_blank"
                    class="btn btn-icon-sm shadow-box btn-border-purple btn-white btn-center border"
                  >
                    <IconDiscord></IconDiscord>
                  </nuxt-link>
                  <!-- <button -->
                  <!--   class="btn btn-icon-sm shadow-box btn-border-purple btn-white btn-center border" -->
                  <!-- > -->
                  <!--   <IconFlag></IconFlag> -->
                  <!-- </button> -->
                </div>
                <p class="mt-4">{{ collection.desc }}</p>
                <nuxt-link
                  class="mt-5 hidden lg:block"
                  :to="{ name: 'rewards' }"
                >
                  <button
                    class="btn btn-brand dark-mode-duration dark:btn-brand-dark btn-border-b btn-base border-2 border-b-4 font-bold"
                  >
                    <div class="flex items-center">
                      <IconPrism></IconPrism>
                      <span class="mx-1 truncate">
                        {{ $t('rewards.earnNEARGoFAR.tradingTitle') }}
                      </span>
                    </div>
                  </button>
                </nuxt-link>
              </div>
            </div>

            <div class="mt-6 lg:mt-0 lg:w-1/2">
              <div class="h-full w-full">
                <div class="lg:flex lg:h-full lg:w-full lg:items-center">
                  <div class="grid w-full grid-cols-2 gap-2 text-left">
                    <div
                      class="shadow-box dark-mode dark-mode-duration space-y-3 rounded-lg border border-transparent bg-white py-2.5 px-4 dark:border-grey-300 lg:py-5 lg:px-6"
                    >
                      <p class="text-sm text-grey-200 dark:text-grey-light2">
                        {{ $t('collection.section.items.title') }}
                      </p>
                      <p class="flex items-center space-x-2">
                        <IconCollections></IconCollections>
                        <span class="font-semibold">
                          {{ collection.stats.totalItems }}
                        </span>
                      </p>
                    </div>
                    <div
                      class="shadow-box dark-mode dark-mode-duration space-y-3 rounded-lg border border-transparent bg-white py-2.5 px-4 dark:border-grey-300 lg:py-5 lg:px-6"
                    >
                      <p class="text-sm text-grey-200 dark:text-grey-light2">
                        {{ $t('collection.overview.owners') }}
                      </p>
                      <p class="flex items-center space-x-2">
                        <IconDetails></IconDetails>
                        <span class="font-semibold">
                          {{ collection.stats.totalOwners }}
                        </span>
                      </p>
                    </div>
                    <div
                      class="shadow-box dark-mode dark-mode-duration space-y-3 rounded-lg border border-transparent bg-white py-2.5 px-4 dark:border-grey-300 lg:py-5 lg:px-6"
                    >
                      <p class="text-sm text-grey-200 dark:text-grey-light2">
                        {{ $t('collection.overview.floorPrice') }}
                      </p>
                      <p class="flex items-center space-x-2">
                        <img
                          src="~/assets/images/icons/fnf/near-coin.svg"
                          :alt="$t('common.nearCoin')"
                          class="h-6 w-5 lg:h-11 lg:w-9"
                        />
                        <span class="font-semibold">
                          {{ collection.stats.floorPrice }}
                        </span>
                      </p>
                    </div>
                    <div
                      class="shadow-box dark-mode dark-mode-duration space-y-3 rounded-lg border border-transparent bg-white py-2.5 px-4 dark:border-grey-300 lg:py-5 lg:px-6"
                    >
                      <p class="text-sm text-grey-200 dark:text-grey-light2">
                        {{ $t('collection.overview.totalVolume') }}
                      </p>
                      <p class="flex items-center space-x-2">
                        <img
                          src="~/assets/images/icons/fnf/near-coin.svg"
                          :alt="$t('common.nearCoin')"
                          class="h-6 w-5 lg:h-11 lg:w-9"
                        />
                        <span class="font-semibold">
                          {{ collection.stats.totalVolume }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <nuxt-link
                class="mt-5 block w-full lg:hidden"
                :to="{ name: 'rewards' }"
              >
                <button
                  class="btn btn-brand dark-mode-duration dark:btn-brand-dark btn-border-b btn-base btn-center btn btn-brand btn-border-b dark-mode-duration btn-base btn-center w-full border-2 border-b-4 font-bold"
                >
                  <div class="btn-between">
                    <IconPrism></IconPrism>
                    <span class="mx-1 truncate">
                      {{ $t('rewards.earnNEARGoFAR.tradingTitle') }}
                    </span>
                  </div>
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <nav
        class="dark-mode dark-mode-duration flex items-center justify-center space-x-2.5 border-b border-grey-light py-2.5 dark:border-grey-300 md:py-5"
      >
        <ul
          class="container-snap flex w-full snap-x justify-center gap-x-2.5 overflow-x-scroll pb-5 md:self-start lg:overflow-auto lg:px-0"
        >
          <li
            v-for="{ title, routeName, params, icon } in collectionLinks"
            :key="title"
            class="snap-start"
          >
            <nuxt-link
              :to="{ name: routeName, params }"
              class="btn btn-lg btn-white shadow-box btn-border-purple block rounded-lg border-2 font-bold"
            >
              <div class="flex items-center space-x-2">
                <component :is="icon"></component>
                <p>{{ title }}</p>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else class="h-[416px] animate-pulse">
      <div
        class="container py-6 text-center lg:flex lg:justify-between lg:space-x-20 lg:py-20"
      >
        <div
          class="lg:flex lg:w-1/2 lg:justify-between lg:space-x-7 lg:text-left"
        >
          <div
            class="shadow-box mx-auto h-36 w-36 rounded-lg dark:bg-darkSecondary lg:ml-0 lg:h-44 lg:w-44"
          ></div>
          <div class="h-64 w-full rounded-lg dark:bg-darkSecondary"></div>
        </div>
        <div class="mt-6 lg:mt-0 lg:w-1/2">
          <div class="h-full w-full">
            <div class="lg:flex lg:h-full lg:w-full lg:items-center">
              <div class="grid w-full grid-cols-2 gap-2 text-left">
                <div
                  v-for="block in 4"
                  :key="block"
                  class="shadow-box dark-mode-duration h-16 space-y-3 rounded-lg border border-transparent bg-white py-2.5 px-4 dark:bg-darkSecondary md:h-28 lg:py-5 lg:px-6"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav
      v-if="pending"
      class="dark-mode dark-mode-duration flex animate-pulse items-center justify-center space-x-2.5 border-b border-grey-light py-2.5 dark:border-grey-300 md:py-5"
    >
      <div class="h-12 w-36 rounded-lg dark:bg-darkSecondary"></div>
      <div class="h-12 w-36 rounded-lg dark:bg-darkSecondary"></div>
    </nav>
    <NuxtPage
      v-if="collection && collection.accountId"
      :collection="collection ?? {}"
      :collection-account-id="collection.accountId ?? ''"
    />
  </div>
</template>

<script>
import { useClipboard } from '@vueuse/core'
import i18n from 'i18next'
import { defineComponent, useRoute } from '#imports'
import localUtils from '~/utils'

import IconList from '~/assets/images/icons/list.svg?component'
import IconChart from '~/assets/images/icons/chart.svg?component'
import IconCopy from '~/assets/images/icons/copy.svg?component'

import IconVerifiedMacaron from '~/assets/images/icons/verified-macaron.svg?component'
import IconPrism from '~/assets/images/icons/fnf/prism.svg?component'
import IconDiscord from '~/assets/images/icons/socials/discord.svg?component'
import IconTwitter from '~/assets/images/icons/socials/twitter.svg?component'
import IconI18n from '~/assets/images/icons/i18n.svg?component'
// import IconFlag from '~/assets/images/icons/flag.svg?component'
import IconCollections from '~/assets/images/icons/collections.svg?component'
import IconDetails from '~/assets/images/icons/details.svg?component'

export default defineComponent({
  components: {
    IconList,
    IconChart,
    IconVerifiedMacaron,
    IconPrism,
    IconDiscord,
    IconTwitter,
    IconI18n,
    // IconFlag,
    IconCollections,
    IconDetails,
    IconCopy,
  },

  setup() {
    const {
      $useFetch,
      $near: { nearAPI },
    } = useNuxtApp()
    const route = useRoute()
    const { formatNumeral } = useFormat()
    const { isDark } = useDark()
    const collectionAccountId = route.params.id

    const {
      data: collections,
      // error,
      pending,
      // refresh,
    } = $useFetch(`/collection/${collectionAccountId}`)

    const collection = computed(() => collections.value)
    const { copy, copied } = useClipboard()

    const collectionLinks = [
      {
        title: i18n.t('collection.section.items.title'),
        routeName: 'collection-id',
        params: {
          id: collectionAccountId,
        },
        icon: IconList,
      },
      {
        title: i18n.t('activity.title'),
        routeName: 'collection-id-activities',
        params: {
          id: collectionAccountId,
        },
        icon: IconChart,
      },
    ]

    return {
      isDark,
      copy,
      copied,
      pending,
      collectionLinks,
      createImageSet: localUtils.createImageSet,

      collection: computed(() => {
        const { utils } = nearAPI

        if (!collection.value) {
          return null
        }
        return {
          name: collection.value?.collectionName,
          desc: collection.value?.description,
          accountId: collection.value?.collectionId,
          media: collection.value?.media,
          media256: collection.value?.media256,
          media512: collection.value?.media512,
          media1024: collection.value?.media1024,
          cover: collection.value?.cover2048 || collection.value?.cover,
          socialMedia: collection.value?.socialMedia,
          isVerified: collection.value?.isVerified,
          stats: {
            floorPrice: formatNumeral(
              utils.format.formatNearAmount(
                collection.value?.floorPrice?.$numberDecimal,
                2
              )
            ),
            totalVolume: formatNumeral(
              utils.format.formatNearAmount(
                collection.value?.volume?.$numberDecimal,
                2
              )
            ),
            totalOwners: collection.value?.totalOwners,
            totalItems: collection.value?.totalCards,
          },
          attributes: collection.value?.attributes,
        }
      }),
    }
  },
})
</script>
<style lang="postcss" scoped>
.router-link-exact-active {
  @apply border-purple bg-purple  text-white  hover:border-blue hover:bg-blue active:border-blue active:bg-blue;
}
</style>
