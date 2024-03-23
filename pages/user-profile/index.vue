<template>
  <div>
    <!-- TODO design tokens title  -->
    <h1 class="title mt-6 text-center font-bold lg:hidden">
      {{ $t('profile.sections.myItems') }}
    </h1>

    <div
      v-if="items && items.length > 0"
      class="-mx-2 flex flex-wrap lg:-mx-3 lg:mt-6"
    >
      <div
        v-for="{
          tokenSeriesId,
          contractId,
          metadata: { title, media },
          isVerified,
          media256,
          media512,
          media1024,
          isOnSale,
        } in items"
        :key="tokenSeriesId"
        class="animate-up-hover mt-6 w-1/2 px-2 sm:w-1/3 lg:w-1/4 lg:px-3 xl:w-1/6"
      >
        <ItemCard
          :token-series-id="tokenSeriesId"
          :name="title"
          :contract-id="contractId"
          :media="media"
          :is-verified="isVerified"
          :is-on-sale="isOnSale"
          :img-set="
            createImageSet({
              256: media256,
              512: media512,
              1024: media1024,
            })
          "
        >
        </ItemCard>
      </div>
    </div>
    <UserProfileLoading v-else />
    <div v-if="items && items.length === 0" class="mx-auto">
      <img src="~/assets/images/empty-fridge.svg" :alt="$t('common.noItems')" />
      <p class="mt-5 text-center text-lg font-semibold">
        {{ $t('common.noItems') }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '#imports'

import { useUser } from '~/stores/user'

import utils from '~/utils'

export default defineComponent({
  async setup() {
    const userStore = useUser()
    const items = computed(() => userStore.nft.nftItems)

    return {
      items,
      createImageSet: utils.createImageSet,
    }
  },
})
</script>
