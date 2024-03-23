<template>
  <div v-if="!pending && item" class="container relative space-y-4">
    <div class="grid grid-cols-1 space-y-4 lg:grid-cols-2 lg:gap-x-14">
      <section v-if="lgAndLarger" class="hidden space-y-4 lg:block">
        <div class="relative mt-5 max-h-[692px]">
          <BaseImg
            :media="item.metadata.media"
            :alt="item.metadata.name"
            class="w-full rounded-lg shadow-md"
          />
        </div>
        <ItemDetailPriceHistory
          :contract-id="item.contractId"
          :token-id="item.tokenSeriesId"
        />
      </section>

      <div class="space-y-4">
        <section>
          <ItemDetailProfile
            v-if="item && collectionName"
            :media="item.metadata.media"
            :name="item.metadata.title"
            :collection-name="collectionName"
            :collection-account-id="$route.params.contractId"
            :collection-is-verified="collectionIsVerified"
            :img-set="
              createImageSet({
                256: item.metadata.media256,
                512: item.metadata.media512,
                1024: item.metadata.media1024,
              })
            "
          />
        </section>
        <section>
          <ItemDetailActions
            :is-for-sale="isForSale"
            :price="itemPriceFormatted"
          >
            <template #content-actions-buttons>
              <ItemDetailActionBuyOffer
                v-if="isForSale && !isUserItem"
                :key="isForSale"
                :is-bid="isBid"
                @buy="buy"
                @offer="makeOffer"
                @canceloffer="cancelItemOffer"
              />

              <ItemDetailActionListNFT
                v-else-if="
                  !isForSale && isUserItem && !isForSaleFromAnotherOwnerId
                "
                :media="item.metadata.media"
                :name="item.metadata.title"
                :collection-name="collectionName"
                :collection-account-id="$route.params.contractId"
                :is-verified="collectionIsVerified"
                :img-set="
                  createImageSet({
                    256: item.metadata.media256,
                    512: item.metadata.media512,
                    1024: item.metadata.media1024,
                  })
                "
                @submit="listOrSendNFT"
              />

              <ItemDetailActionAcceptOfferCancel
                v-else-if="isForSale && isUserItem"
                :highest-offer="itemHighestOfferFormatted"
                @accept-highest-offer="acceptHighestOffer"
                @cancel-listing="cancelListing"
              />
            </template>
          </ItemDetailActions>
        </section>
        <section>
          <ItemDetailAbout
            v-if="item.metadata.description"
            :collection-name="collectionName"
            :collection-description="item.metadata.description"
          />
        </section>
        <section v-if="!lgAndLarger" class="block space-y-4 lg:hidden">
          <ItemDetailPriceHistory
            :contract-id="item.contractId"
            :token-id="item.tokenSeriesId"
          />
        </section>
        <section>
          <ItemDetailProperties
            v-if="item.metadata.attributes && collectionAttribues.length > 0"
            :attributes="item.metadata.attributes"
            :collection-attributes="collectionAttribues"
          />
        </section>
        <section>
          <ItemDetailDetails
            :contract-id="item.contractId"
            :royalty="item.royalty"
            :owner-id="item?.ownerId ?? ''"
          />
        </section>
      </div>
    </div>
    <section class="lg:pt-16">
      <ItemDetailOffers
        :token-id="item.tokenSeriesId"
        :token-contract-id="item.contractId"
      />
    </section>
    <ItemDetailActivities
      :token-id="item.tokenSeriesId"
      :token-contract-id="item.contractId"
    />
    <section>
      <ItemDetailMore :items="moreItems" :is-verified="collectionIsVerified" />
    </section>
    <div class="spacing-h-135" />
  </div>
</template>

<script>
import i18n from 'i18next'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, ref, useRoute, useRouter, useToast } from '#imports'
import utils from '~/utils'

export default defineComponent({
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const lgAndLarger = breakpoints.greater('lg')
    const {
      $near: { nearAPI, userAccountId },
    } = useNuxtApp()

    const { $useFetch } = useNuxtApp()
    const { displayToast } = useToast()
    const route = useRoute()
    const router = useRouter()

    const contractId = route.params.contractId
    const tokenId = route.params.id

    const {
      data: item,
      error,
      pending,
    } = $useFetch(`/nft/${contractId}/${encodeURIComponent(tokenId)}`)

    watch(error, () => {
      if (error.value) {
        throwError(error.value.data)
      }
    })

    const { data: items } = $useFetch(
      `/nft?contractId=${route.params?.contractId}&limit=6`
    )

    const moreItems = computed(() => items.value?.docs ?? [])

    const { data: collection } = $useFetch(
      `/collection/${route.params?.contractId}`
    )
    const collectionName = computed(
      () => collection.value?.collectionName ?? ''
    )
    const headTitle = computed(
      () => `${collection.value?.collectionName} #${item.value?.metadata.title}`
    )
    useHead({
      title: headTitle,
    })

    const collectionAttribues = computed(
      () => collection.value?.attributes ?? []
    )

    const collectionIsVerified = computed(
      () => collection.value?.isVerified ?? ''
    )

    const {
      makeStorageDeposit,
      cancelOffer,
      acceptOffer,
      removeSale,
      getSale,
      offer,
    } = useContractMarket()
    const {
      getItem: getNftToken,
      listItem,
      sendNFT,
      getTransactionState,
    } = useContractNFT(contractId)

    const sale = ref(null)
    const nftToken = ref(null)

    const notificationAlertModalOpen = ref(false)
    const toastMessage = ref('')
    const ACTION_LIST_ITEM = 'LIST_ITEM'

    const isForSaleFromAnotherOwnerId = computed(() => {
      return (
        sale.value !== null && sale?.value?.owner_id !== item?.value?.ownerId
      )
    })

    const isForSale = computed(() => {
      return item?.value?.isOnSale
      // TODO - ask Cristian:  hasPrice  false after listing
      // return item.value.hasPrice
    })

    const isBid = computed(() => {
      if (
        sale.value !== null &&
        sale.value.owner_id !== userAccountId.value &&
        sale.value.bids &&
        sale.value.bids.near
      ) {
        const bid = sale.value.bids.near.find(
          (s) => s.owner_id === userAccountId.value
        )
        if (bid) return true
      }
      return false
    })

    const isUserItem = computed(() => {
      return nftToken.value?.owner_id === userAccountId.value
    })

    const itemPriceFormatted = computed(() => {
      if (sale.value?.sale_conditions?.near) {
        return nearAPI.utils.format.formatNearAmount(
          sale.value?.sale_conditions.near
        )
      }

      return nearAPI.utils.format.formatNearAmount(
        item.value.price?.$numberDecimal
      )
    })

    const itemHighestOfferFormatted = computed(() => {
      /*  return nearAPI.utils.format.parseNearAmount(
        item.value?.metadata.issued_at?.high
      return item.value?.metadata.issued_at?.high ?? ''
      ) */

      if (sale.value && sale.value.bids.near) {
        const highestBid = Math.max(
          ...sale.value?.bids?.near?.map((bid) => Number(bid.price))
        )

        return nearAPI.utils.format.formatNearAmount(
          highestBid.toLocaleString('fullwide', { useGrouping: false })
        )
      }

      return null
    })

    const buy = () => {
      const amount = itemPriceFormatted.value

      offer(contractId, tokenId, amount)
    }

    const makeOffer = (price) => {
      offer(contractId, tokenId, price)
    }

    const listNFTWithoutDeposit = async (price) => {
      await makeStorageDeposit(price)
      await listItem(tokenId, price.toString())
    }

    // this function is a workaround for batch transaction
    const listNFTAfterDeposit = async () => {
      // if we successfuly storage_deposit but cancel nft_approve we keep trying to list the nft
      if (route.query.errorCode) {
        router.replace({ query: {} })
      }
      // IF we came from a approve/cancel near transaction - get the route query
      if (route.query.transactionHashes && !route.query.errorCode) {
        // get the state of the transaction
        const stateTxHash = await getTransactionState(
          route.query.transactionHashes
        )

        // TODO status: {SuccessValue} not working ?!!??
        const { transaction } = stateTxHash

        /******************************************************
          IF function call is storage_deposit, we retreive its arguments
          WHY? for check purposes - when hiting List Item btn, the amount & msg has been passed via args for storage_deposit call function
          WHY ? to be able to trigger listItem as soon as we get back to the page
        *****************************************************/

        // TODO - change to if status.SuccessValue && ...
        if (
          stateTxHash &&
          transaction.actions[0].FunctionCall.method_name === 'storage_deposit'
        ) {
          // args is base64 string. ex->  eyJhbW91bnQiOjEsIm1zZyI6Imxpc3RORlQifQ==',
          const argsBase64 = transaction.actions[0].FunctionCall.args

          // convert to json ex-> {amount: 1, msg: 'listNFT'}
          const argsJson = JSON.parse(
            Buffer.from(argsBase64, 'base64').toString('ascii')
          )

          // check if we get listNFT msg and the amount
          if (argsJson && argsJson.msg === 'listNFT' && argsJson.amount > 0) {
            // finally list the NFT !!!
            await listItem(tokenId, argsJson.amount.toString())
          }
        }
      }
    }

    const cancelListing = () => {
      if (isUserItem.value && isForSale.value) {
        removeSale(contractId, tokenId)
      }
    }

    const acceptHighestOffer = () => {
      if (isUserItem.value && isForSale.value) {
        acceptOffer(contractId, tokenId)
      }
    }

    const cancelItemOffer = () => {
      cancelOffer(contractId, tokenId)
    }
    const listOrSendNFT = ({ action, price, receiverId }) => {
      if (action === ACTION_LIST_ITEM) {
        listNFTWithoutDeposit(price)
      } else {
        sendNFT(receiverId, tokenId)
      }
    }

    onMounted(async () => {
      sale.value = await getSale(contractId, tokenId)
      nftToken.value = await getNftToken(tokenId)

      listNFTAfterDeposit()
    })

    return {
      ACTION_LIST_ITEM,

      item,
      itemPriceFormatted,
      itemHighestOfferFormatted,

      isBid,
      pending,
      isForSale,
      nftToken,
      isUserItem,
      moreItems,
      isForSaleFromAnotherOwnerId,

      collectionName,
      collectionAttribues,
      collectionIsVerified,

      buy,
      listOrSendNFT,
      makeOffer,
      cancelListing,
      acceptHighestOffer,
      cancelItemOffer,

      lgAndLarger,
      displayToast,
      toastMessage,
      notificationAlertModalOpen,
      createImageSet: utils.createImageSet,
    }
  },

  methods: {
    // setting message for toast
    setToastMessage(type) {
      if (type === i18n.t('itemDetail.action.makeOffer')) {
        this.toastMessage = i18n.t('itemDetail.toastMessage.offerMade')
      } else if (type === i18n.t('itemDetail.action.listItem')) {
        this.toastMessage = i18n.t('itemDetail.toastMessage.itemListed')
      } else {
        this.toastMessage = i18n.t('itemDetail.toastMessage.itemSent')
      }

      this.displayToast({
        message: this.toastMessage,
        title: i18n.t('itemDetail.toastMessage.successTitle'),
        type: 'success',
      })
    },
  },
})
</script>
