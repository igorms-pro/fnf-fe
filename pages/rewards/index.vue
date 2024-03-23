<template>
  <div>
    <section class="relative">
      <RewardsHero :few-and-far-apr="30" />
    </section>
    <div v-if="countryAvaibility && !REWARDS_COMING_SOON">
      <section class="py-5">
        <div class="mt-6 lg:mt-12">
          <RewardsFarming />
          <hr
            class="my-12 h-px w-full border-grey-light2 dark:border-grey-300 lg:my-24"
          />
          <RewardsStaking />
        </div>
      </section>
      <hr
        class="mt-10 h-px w-full border-grey-light2 dark:border-grey-300 lg:mt-24"
      />
    </div>

    <div
      v-if="!countryAvaibility && REWARDS_COMING_SOON"
      class="relative mx-auto items-center pt-14 text-center lg:w-[440px] lg:py-14"
    >
      <div class="container">
        <img
          src="~/assets/images/empty_island.svg"
          class="mx-auto mb-5 lg:h-72 lg:w-72"
        />
        <p class="px-2 text-base lg:text-lg">
          {{
            $t(
              `rewards.${
                REWARDS_COMING_SOON ? 'rewardsComingSoon' : 'rewardsNoAvailable'
              }`
            )
          }}
        </p>
        <nuxt-link
          v-if="collectionExplorerId"
          :to="{
            name: 'collection-id',
            params: { id: collectionExplorerId },
          }"
          class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl mx-auto mt-6 block w-full font-semibold"
        >
          {{ $t('home.explore.action.exploreNFTs') }}
        </nuxt-link>

        <template v-if="REWARDS_COMING_SOON">
          <nuxt-link
            href="https://discord.gg/mWYuDzfTPJ"
            target="_blank"
            class="mt-3 block text-base font-bold"
          >
            {{ $t('common.action.btnCommunity') }}
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link
            href="https://docs.fewfar.com/legal/terms-of-service.html"
            target="_blank"
            class="mt-3 block text-base font-bold"
          >
            {{ $t('common.action.readTermsOfService') }}
          </nuxt-link>
        </template>

        <span class="mt-3 block text-base font-bold"> </span>
      </div>
      <hr
        class="mt-10 block h-px w-full border-grey-light2 dark:border-grey-300 lg:mt-24 lg:hidden"
      />
    </div>
    <section class="relative pt-10 lg:py-24">
      <div class="absolute inset-0 hidden lg:block">
        <img
          src="~/assets/images/backgrounds/mask-radial-rewards.svg"
          alt="mask-radial-rewards"
          class="h-full w-full object-cover dark:hidden"
        />
        <img
          src="~/assets/images/backgrounds/mask-radial-rewards-footer_dark.png"
          alt="mask-radial-rewards"
          class="hidden h-full w-full object-cover dark:block"
        />
      </div>
      <div class="container relative z-10 lg:p-0">
        <RewardsEarnNearGoFar />
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import { useCollections } from '~/stores/collections'

export default defineComponent({
  setup() {
    const countryAvaibility = ref(false)
    const collectionsStore = useCollections()
    const collectionExplorerId = computed(
      () => collectionsStore.collectionExplorerId ?? null
    )

    return {
      REWARDS_COMING_SOON: true,

      countryAvaibility,
      collectionExplorerId,
    }
  },
})
</script>
