<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <table
          class="min-w-full table-auto border-separate [border-spacing:0.5rem]"
          @click.stop
        >
          <thead>
            <tr
              class="flex items-center border-t border-grey-150 text-grey-200 dark:border-grey-300 dark:text-grey-light2"
            >
              <th scope="col" class="my-th">
                {{ $t('itemDetail.tableHeader.item') }}
              </th>
              <th scope="col" class="my-th">
                {{ $t('itemDetail.tableHeader.amount') }}
              </th>
              <th scope="col" class="my-th">
                {{ $t('itemDetail.tableHeader.address') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <div
              v-for="{
                token_id: id,
                contract_id: contractId,
                metadata: { title: name, media: img },
                signer_account_id: bidder,
                price: amount,
              } in offers"
              :key="id"
              tag="tr"
              class="flex appearance-none items-center border-t border-transparent border-grey-150 transition duration-300 ease-in-out dark:border-grey-300"
            >
              <td class="my-td w-1/3">
                <div class="flex items-center space-x-4">
                  <nuxt-link
                    class="flex items-center font-semibold hover:text-purple"
                    :to="{
                      name: 'item-detail-contractId-id',
                      params: { contractId, id: id },
                    }"
                    :title="name"
                  >
                    <BaseImg
                      class="mr-4 h-12 w-12 rounded"
                      :src="img"
                      :alt="name"
                    />
                    <span class="w-fit truncate"> {{ name }}</span>
                  </nuxt-link>
                </div>
              </td>
              <td
                class="my-td flex w-32 items-center space-x-0.5 font-semibold"
              >
                <p>
                  {{ amount ? utils.format.formatNearAmount(amount, 2) : '-' }}
                </p>
                <LogoNear />
              </td>
              <!-- //TODO backend need to update to Tx address -->
              <td class="my-td">
                {{ bidder }}
              </td>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useNuxtApp } from '#imports'

export default defineComponent({
  props: {
    offers: {
      type: Array,
      default: () => {},
    },
  },

  setup() {
    const { activityTypeMapping } = useActivity()
    const { formatNumeral } = useFormat()
    const { formatTransactionId } = useAccountIdFormat()
    const {
      $near: { nearAPI },
    } = useNuxtApp()
    const { utils } = nearAPI
    return {
      utils,
      activityTypeMapping,

      formatNumeral,
      formatTransactionId,
    }
  },
})
</script>
<style scoped>
.my-th {
  @apply w-1/3 px-3 py-3.5 text-left text-sm font-semibold;
}
.my-td {
  @apply w-1/3 truncate px-3 py-3.5 align-middle;
}
</style>
