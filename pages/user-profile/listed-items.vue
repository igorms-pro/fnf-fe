<template>
  <div>
    <!-- TODO design tokens title  -->
    <h1 :key="listedItems" class="title mt-6 text-center font-bold lg:hidden">
      {{ $t('profile.sections.listedItems') }}
    </h1>

    <template v-if="!listedItems" >
      <UserProfileLoading />
    </template>

    <div :key="listedItems" class="-mx-2 flex flex-wrap lg:-mx-3 lg:mt-6">
      <template v-if="listedItems && listedItems.length > 0">
        <div
          v-for="{
            tokenSeriesId,
            contractId,
            metadata: { title: name, media },
            price: { $numberDecimal: price },
            isVerified,
            media256,
            media512,
            media1024,
          } in listedItems"
          :key="tokenSeriesId"
          class="animate-up-hover mt-6 w-1/2 px-2 sm:w-1/3 lg:w-1/4 lg:px-3 xl:w-1/6"
        >
          <ItemCardListed
            :token-series-id="tokenSeriesId"
            :name="name"
            :contract-id="contractId"
            :price="price"
            :media="media"
            :is-verified="isVerified"
            :img-set="
              createImageSet({
                256: media256,
                512: media512,
                1024: media1024,
              })
            "
          >
          </ItemCardListed>
        </div>
      </template>
      <div v-if="listedItems && listedItems.length === 0" class="mx-auto">
        <img
          src="~/assets/images/empty-fridge.svg"
          :alt="$t('common.noItems')"
        />
        <p class="mt-5 text-center text-lg font-semibold">
          {{ $t('common.noItems') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useUser } from '~/stores/user'
import localUtils from '~/utils'
import { defineComponent } from '#imports'

export default defineComponent({
  async setup() {
    const userStore = useUser()
    const listedItems = computed(() => userStore.nft.sales)

    return {
      listedItems,
      createImageSet: localUtils.createImageSet,
    }
  },
})
</script>
