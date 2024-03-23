<template>
  <div>
    <!-- TODO design tokens title  -->
    <h1 class="title mt-6 text-center font-bold lg:hidden">
      {{ $t('profile.sections.offersMade') }}
    </h1>

    <template v-if="loading">
      <UserProfileLoading />
    </template>

    <div class="-mx-2 flex flex-wrap lg:-mx-3 lg:mt-6">
      <template v-if="!loading && offers.length > 0">
        <div
          v-for="{
            id,
            contractId,
            name,
            media,
            price,
            isVerified,
            media256,
            media512,
            media1024,
          } in offers"
          :key="id"
          class="animate-up-hover mt-6 w-1/2 px-2 sm:w-1/3 lg:w-1/4 lg:px-3 xl:w-1/6"
        >
          <ItemCardListed
            :token-series-id="id"
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
            <template #actionButton>
              <div></div>
              <button
                class="btn btn-primary btn-border-primary btn-base mt-2 w-full border-2"
                @click.prevent="cancelItemOffer(contractId, id)"
              >
                {{ $t('activity.type.withdrawOffer') }}
              </button>
            </template>
          </ItemCardListed>
        </div></template
      >
      <div v-if="!loading && offers.length === 0" class="mx-auto">
        <img
          src="~/assets/images/empty-fridge.svg"
          :alt="$t('profile.sections.offersMadeEmpty')"
        />
        <p class="mt-5 text-center text-lg font-semibold">
          {{ $t('profile.sections.offersMadeEmpty') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from '#imports'
import { useUser } from '~/stores/user'
import localUtils from '~/utils'

export default defineComponent({
  setup() {
    const userStore = useUser()
    const offers = ref([])
    const items = computed(() => userStore.nft.nftItems)
    const loading = ref(true)

    const { cancelOffer } = useContractMarket()

    const cancelItemOffer = (contractId, tokenId) => {
      cancelOffer(contractId, tokenId)
    }
    const getOffersMadeActivities = async () => {
      // get our offers made
      const offersMade = await userStore.getOffersMade()

      if (offersMade?.length > 0) {
        // BE sending all offers - need to remove duplicate
        const uniqOffers = offersMade?.filter(
          (v, i, a) => a.findIndex((v2) => v2.token_id === v.token_id) === i
        )

        uniqOffers.forEach((offersMadeItem) => {
          // TODO BE update ? avoid sending previous offer before a purchase
          const item = items?.value?.find(
            (item) => item.tokenSeriesId === offersMadeItem.token_id
          )
          // check response & if we bought the NFT after offers
          if (!item) {
            offers?.value?.push({
              id: offersMadeItem.token_id,
              contractId: offersMadeItem.nft_contract_id,
              price: offersMadeItem.price,
              name: offersMadeItem.metadata.title ?? '',
              media: offersMadeItem.metadata.media ?? '',
              isVerified: offersMadeItem.isVerified ?? false,
            })
          }
        })
      }
      loading.value = false
    }

    onMounted(() => {
      getOffersMadeActivities()
    })

    return {
      offers,
      loading,

      cancelItemOffer,
      createImageSet: localUtils.createImageSet,
    }
  },
})
</script>
