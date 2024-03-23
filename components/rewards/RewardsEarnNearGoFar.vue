<template>
  <section class="lg:flex lg:justify-between">
    <div
      class="px-5 text-center lg:mt-5 lg:w-1/2 lg:pr-24 lg:text-left xl:w-1/3 xl:pr-0 2xl:pr-24"
    >
      <h1 class="text-2xl font-extrabold lg:text-6xl">
        {{ $t('rewards.earnNEARGoFAR.earNEAR') }}
        <strong class="mt-1 lg:block">
          {{ $t('rewards.earnNEARGoFAR.goFAR') }}
        </strong>
      </h1>
      <p class="my-3 text-base font-semibold text-purple md:mt-12 lg:text-lg">
        {{ $t('rewards.earnNEARGoFAR.subTitle') }}
      </p>
      <p
        class="text-sm text-grey-300 dark:text-grey-light2 md:mt-5 md:text-base"
      >
        {{ $t('rewards.earnNEARGoFAR.description') }}
      </p>
      <div class="mb-10 hidden items-center text-center lg:mt-14 lg:flex">
        <template v-if="REWARDS_COMING_SOON">
          <nuxt-link
            href="https://discord.gg/mWYuDzfTPJ"
            target="_blank"
            class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl my-4 w-full text-center lg:w-2/3"
          >
            {{ $t('common.action.btnCommunity') }}
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link
            class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl my-4 w-full text-center lg:w-2/3"
            :href="URL_REF_FINANCE_BUY_FAR"
            target="_blank"
          >
            {{ $t('rewards.earnNEARGoFAR.buyFARRefFinance') }}
          </nuxt-link>
        </template>

        <nuxt-link
          href="https://docs.fewfar.com/"
          target="_blank"
          class="cursor-pointer font-bold transition-colors hover:text-purple lg:w-1/2"
        >
          {{ $t('common.action.learnMore') }}
        </nuxt-link>
      </div>
    </div>
    <div class="my-8 lg:my-5 lg:w-1/2">
      <RewardsCardEarnNearGoFar>
        <template #img>
          <img :src="explorerNft" class="h-32 w-32 md:mx-3 lg:h-48 lg:w-44" />
        </template>
        <template #title> {{ $t('rewards.action.stakeFar') }}</template>
        <template #description>
          {{ $t('rewards.earnNEARGoFAR.stakeDescription') }}
        </template>
      </RewardsCardEarnNearGoFar>
      <RewardsCardEarnNearGoFar class="my-2">
        <template #img>
          <img :src="explorerSwap" class="h-32 w-32 md:mx-3 lg:h-48 lg:w-44" />
        </template>
        <template #title>
          {{ $t('rewards.earnNEARGoFAR.tradingTitle') }}
        </template>
        <template #description>
          {{ $t('rewards.earnNEARGoFAR.tradingDescription') }}
        </template>
      </RewardsCardEarnNearGoFar>
      <RewardsCardEarnNearGoFar>
        <template #img>
          <img :src="explorerFarm" class="h-32 w-32 md:mx-3 lg:h-48 lg:w-44" />
        </template>
        <template #title>
          {{ $t('rewards.earnNEARGoFAR.lpTitle') }}
          <strong class="block text-base">
            {{ $t('rewards.earnNEARGoFAR.lpSubTitle') }}
          </strong>
        </template>
        <template #description>
          {{ $t('rewards.earnNEARGoFAR.lpDescription') }}
        </template>
      </RewardsCardEarnNearGoFar>
    </div>
    <div class="mb-10 block text-center lg:hidden">
      <template v-if="REWARDS_COMING_SOON">
        <nuxt-link
          href="https://discord.gg/mWYuDzfTPJ"
          target="_blank"
          class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl my-4 inline-block w-full text-center font-bold lg:mt-2 lg:block lg:w-1/3"
        >
          {{ $t('common.action.btnCommunity') }}
        </nuxt-link>
      </template>
      <template v-else>
        <nuxt-link
          class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl my-4 inline-block w-full text-center font-bold lg:mt-2 lg:block lg:w-1/3"
          :href="URL_REF_FINANCE_BUY_FAR"
          target="_blank"
        >
          {{ $t('rewards.earnNEARGoFAR.buyFARRefFinance') }}
        </nuxt-link>
      </template>

      <nuxt-link
        href="https://docs.fewfar.com/"
        target="_blank"
        class="block cursor-pointer font-bold"
      >
        {{ $t('common.action.learnMore') }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '#imports'
import explorerSwap from '~/assets/images/explorer-cards/swap.svg'
import explorerNft from '~/assets/images/explorer-cards/nft.svg'
import explorerFarm from '~/assets/images/explorer-cards/farm.svg'

export default defineComponent({
  setup() {
    const { URL_REF_FINANCE_BUY_FAR } = useContractFarming()

    return {
      REWARDS_COMING_SOON: true,

      explorerSwap,
      explorerNft,
      explorerFarm,

      URL_REF_FINANCE_BUY_FAR,
    }
  },
})
</script>
