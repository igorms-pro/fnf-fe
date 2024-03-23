<template>
  <ItemDetailSectionCard v-if="activities" :key="activities">
    <template #content-title>
      <IconActivities class="mr-2 h-5 w-5" />
      <p class="font-semibold">
        {{ $t('itemDetail.section.activities') }}
      </p>
    </template>
    <template #content-section>
      <div v-if="activities.length > 0" class="space-y-1.5">
        <template v-if="!lgAndLarger">
          <div
            v-for="{
              id,
              img,
              name,
              txId,
              type,
              date,
              amount,
              buyer,
              seller,
              contractId,
            } in activities"
            :key="txId"
            class="block"
          >
            <ItemActivity
              :id="id"
              :img="img"
              :tx-id="txId"
              :name="name"
              :amount="amount"
              :buyer="buyer"
              :seller="seller"
              :date="date"
              :type="type"
              :contract-id="contractId"
              :table-type="'item-detail'"
            />
          </div>
        </template>
        <ItemActivityTable
          v-else
          :activities="activities"
          :table-type="'item-detail'"
        ></ItemActivityTable>
      </div>
    </template>
  </ItemDetailSectionCard>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, onMounted, ref, useNuxtApp } from '#imports'
import IconActivities from '~/assets/images/icons/activities.svg?component'

export default defineComponent({
  components: {
    IconActivities,
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
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const lgAndLarger = breakpoints.greater('lg')
    const activities = ref([])
    const { $fetch } = useNuxtApp()

    const getActivities = async () => {
      const data = await $fetch(
        `/nft/${props.tokenContractId}/${encodeURIComponent(props.tokenId)}/activites`
      )
      if (data?.length > 0) {
        // TODO Ask BE to not send me MINT and BURN, and others not needed event
        data
          .filter(
            (item) =>
              item.contract_action !== 'MINT' &&
              item.contract_action !== 'BURN' &&
              item.contract_action !== 'cancel_offer' &&
              item.contract_action !== 'storage_deposit'
          )
          .forEach((itemActivitiesItem) => {
            // sale that occurs outside our platform
            if (
              itemActivitiesItem.contract_action !== 'TRANSFER' &&
              itemActivitiesItem.price !== '-1'
            ) {
              activities.value.push({
                id: itemActivitiesItem.token_id,
                contractId: itemActivitiesItem.nft_contract_id,
                name: itemActivitiesItem.metadata.title ?? '',
                img: itemActivitiesItem.metadata.media ?? '',
                date: itemActivitiesItem.block_timestamp,
                txId: itemActivitiesItem.transaction_hash ?? '',
                type:
                  itemActivitiesItem.contract_action === 'TRANSFER'
                    ? 'resolve_purchase'
                    : itemActivitiesItem.contract_action,
                amount: itemActivitiesItem.price ?? '',
                buyer:
                  itemActivitiesItem.contract_action === 'offer'
                    ? itemActivitiesItem.signer_account_id
                    : itemActivitiesItem.new_owner,
                seller:
                  itemActivitiesItem.contract_action === 'offer'
                    ? ''
                    : itemActivitiesItem.signer_account_id,
              })
            }
          })
      }
    }

    onMounted(async () => {
      getActivities()
    })

    return { lgAndLarger, activities }
  },
})
</script>
