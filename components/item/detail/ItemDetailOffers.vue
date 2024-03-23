<template>
  <ItemDetailSectionCard :is-open="false" :offers-count="offers.length">
    <template #content-title>
      <IconOffers class="mr-2 h-5 w-5" />
      <p class="font-semibold">
        {{
          offers.length > 0
            ? $t('itemDetail.section.offers')
            : $t('profile.sections.offersReceivedEmpty')
        }}
      </p></template
    >
    <template #content-section>
      <div v-if="offers.length > 0" class="space-y-1.5">
        <template v-if="!lgAndLarger">
          <div
            v-for="{
              token_id: id,
              contract_id: contractId,
              metadata: { title: name, media: img },
              transaction_hash: txId,
              method_name: type,
              block_timestamp: date,
              signer_account_id: bidder,
              price: amount,
            } in offers"
            :key="txId"
            class="block"
          >
            <ItemActivity
              :id="id"
              :img="img"
              :tx-id="txId"
              :name="name"
              :amount="amount"
              :date="date"
              :type="type"
              :contract-id="contractId"
              :table-type="'item-detail'"
            >
              <template #content-activity-type>
                <p
                  class="mt-3.5 text-xs font-semibold text-grey-200 dark:text-grey-light2"
                >
                  {{ $t('itemDetail.tableHeader.amount') }}
                </p>
                <LogoNear class="mt-2 text-sm">
                  {{ utils.format.formatNearAmount(amount, 2) }}
                </LogoNear>
                <p
                  class="mt-3.5 mb-1 text-xs font-semibold text-grey-200 dark:text-grey-light2"
                >
                  {{ $t('itemDetail.tableHeader.address') }}
                </p>
                <!-- TODO to be updated with bidder address!!! -->
                <p
                  class="dark-mode mt-2 truncate text-sm font-normal text-black"
                >
                  {{ formatTransactionId(bidder) }}
                </p>
              </template>
            </ItemActivity>
          </div>
        </template>
        <ItemActivityOffersTable
          v-else
          :offers="offers"
        ></ItemActivityOffersTable>
      </div>
    </template>
  </ItemDetailSectionCard>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, onMounted } from '#imports'
import IconOffers from '~/assets/images/icons/offers.svg?component'

export default defineComponent({
  components: {
    IconOffers,
  },
  props: {
    tokenId: {
      type: String,
      required: true,
    },
    tokenContractId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { formatTransactionId } = useAccountIdFormat()

    const breakpoints = useBreakpoints(breakpointsTailwind)
    const lgAndLarger = breakpoints.greater('lg')
    const offers = ref([])
    const isOffersOpen = ref(true)
    const {
      $near: { nearAPI },
      $fetch,
    } = useNuxtApp()
    const { utils } = nearAPI

    const getOffers = async () => {
      const data = await $fetch(
        `/nft/${props.tokenContractId}/${encodeURIComponent(props.tokenId)}/offers`
      )
      if (data?.length > 0) {
        isOffersOpen.value = true
        // TODO ask backend to send only OFFER event
        offers.value = data.filter((item) => item.method_name === 'offer')
      }
    }

    onMounted(async () => {
      getOffers()
    })

    return {
      lgAndLarger,
      offers,
      utils,
      isOffersOpen,
      formatTransactionId,
    }
  },
})
</script>
