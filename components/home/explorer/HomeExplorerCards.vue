<template>
  <div class="container">
    <h2 class="title mb-8 text-center md:mb-20 md:text-left">
      {{ $t('home.explore.title') }}
    </h2>
    <div class="flex w-full items-center justify-center md:inline-block">
      <div
        class="grid grid-cols-2 gap-4 md:flex md:grid-cols-none md:justify-between md:gap-0"
      >
        <HomeExplorerCard
          v-for="card in list"
          :key="card.routeName"
          :card="card"
        ></HomeExplorerCard>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from 'i18next'
import explorerSwap from '~/assets/images/explorer-cards/swap.svg'
import explorerNft from '~/assets/images/explorer-cards/nft.svg'
import explorerStake from '~/assets/images/explorer-cards/stake.svg'
import explorerFarm from '~/assets/images/explorer-cards/farm.svg'

import { useCollections } from '~/stores/collections'

export default {
  setup() {
    const {
      $near: { isSignedIn },
    } = useNuxtApp()

    const collectionsStore = useCollections()

    return {
      isSignedIn,
      list: computed(() => [
        {
          label: i18n.t('nft.list'),
          colorCls: 'bg-green-light dark:bg-card-apple',
          icon: explorerStake,
          routeName: 'user-profile',
        },
        {
          label: i18n.t('home.explore.action.swap'),
          colorCls: 'bg-pink-light dark:bg-card-pink',
          icon: explorerSwap,
          routeName: 'collection-id',
          routeParams: {
            id: collectionsStore?.collectionExplorerId ?? '0',
          },
        },
        {
          label: i18n.t('home.explore.action.earnRewards'),
          colorCls: 'bg-blue-light dark:bg-card-cyan',
          icon: explorerNft,
          routeName: 'rewards',
        },
        {
          label: i18n.t('home.explore.action.farm'),
          colorCls: 'bg-purple-light dark:bg-card-indigo',
          icon: explorerFarm,
          routeName: 'rewards',
        },
      ]),
    }
  },
}
</script>
