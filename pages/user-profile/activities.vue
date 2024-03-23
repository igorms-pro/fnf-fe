<template>
  <div>
    <h1 class="title mt-6 mb-8 text-center font-bold lg:hidden">
      {{ $t('itemDetail.section.activities') }}
    </h1>
    <div class="space-y-1.5 pt-1.5 md:pt-0 lg:mt-6">
      <template v-if="loading">
        <UserProfileLoading />
      </template>
      <template v-if="activities.length > 0">
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
              imgSet,
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
              :table-type="'user-profile'"
              :img-set="imgSet"
            >
            </ItemActivity>
          </div>
        </template>
        <ItemActivityTable
          v-else
          :activities="activities"
          :table-type="'user-profile'"
        ></ItemActivityTable>
      </template>
      <div v-if="!loading && activities.length === 0" class="mx-auto">
        <img
          src="~/assets/images/empty-fridge.svg"
          class="mx-auto"
          :alt="$t('profile.sections.activitiesEmpty')"
        />
        <p class="mt-5 text-center text-lg font-semibold">
          {{ $t('profile.sections.activitiesEmpty') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { onMounted } from '#imports'
import { useUser } from '~/stores/user'
import localUtils from '~/utils'

export default {
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const lgAndLarger = breakpoints.greater('lg')

    const userStore = useUser()
    const activities = ref([])
    const loading = ref(true)

    const getUserActivities = async () => {
      const items = computed(() => userStore.nft.nftItems)
      const userActitivies = await userStore.getActivities()

      if (userActitivies.length > 0) {
        const filteredActivites = userActitivies.filter(
          (activity) =>
            activity.contract_action !== 'storage_deposit' &&
            activity.contract_action !== 'cancel_offer' &&
            activity.contract_action !== 'MINT' &&
            activity.contract_action !== 'BURN'
        )
        filteredActivites.forEach((activityItem) => {
          const item = items.value?.find(
            (item) => item.tokenSeriesId === activityItem.token_id
          )

          // sale that occurs outside our platform
          if (
            activityItem.contract_action !== 'TRANSFER' &&
            activityItem.price !== '-1'
          ) {
            activities.value.push({
              id: activityItem.token_id,
              contractId: activityItem.nft_contract_id,
              name: activityItem?.metadata?.title ?? '',
              img: activityItem?.metadata?.media ?? '',
              txId: activityItem.transaction_hash,
              type:
                activityItem.contract_action === 'publish_nft'
                  ? 'nft_on_approve'
                  : activityItem.contract_action === 'TRANSFER'
                  ? 'resolve_purchase'
                  : activityItem.contract_action,
              date: activityItem.block_timestamp,
              amount: activityItem.price ?? '',
              buyer:
                activityItem.contract_action === 'offer'
                  ? activityItem.signer_account_id
                  : activityItem.new_owner,
              seller:
                activityItem.contract_action === 'offer'
                  ? ''
                  : activityItem.signer_account_id,
              imgSet: localUtils.createImageSet({
                256: item && item.media256,
                512: item && item.media512,
                1024: item && item.media1024,
              }),
            })
          }
        })
      }
      loading.value = false
    }

    onMounted(() => {
      getUserActivities()
    })
    return { lgAndLarger, activities, loading }
  },
}
</script>
