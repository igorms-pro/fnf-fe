<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div
        v-if="itemActivities.length > 0"
        :key="itemActivities"
        class="inline-block min-w-full py-2 md:px-4 lg:py-0 xl:px-8"
      >
        <table
          class="[border-spacing:0.5rem 0] min-w-full table-auto border-separate"
          @click.stop
        >
          <thead>
            <tr
              :class="[
                tableType !== 'user-profile'
                  ? 'border-t border-grey-150 dark:border-grey-300  '
                  : '',
                'flex items-center justify-between text-grey-200 dark:text-grey-light2',
              ]"
            >
              <th scope="col" class="my-th w-60 md:w-52">
                {{ $t('itemDetail.tableHeader.item') }}
              </th>
              <th scope="col" class="my-th w-32">
                {{ $t('itemDetail.tableHeader.transactionID') }}
              </th>
              <th
                scope="col"
                :class="[
                  'my-th lg:w-36',
                  {
                    'md:w-28 md:!text-left': tableType !== 'user-profile',
                  },
                ]"
              >
                {{ $t('itemDetail.tableHeader.type') }}
              </th>
              <th
                scope="col"
                :class="[
                  'my-th',
                  tableType !== 'user-profile' ? 'w-24' : 'w-28',
                ]"
              >
                {{ $t('itemDetail.tableHeader.time') }}
              </th>
              <th
                scope="col"
                :class="[
                  'my-th',
                  tableType !== 'user-profile' ? 'w-28 xl:w-32' : 'w-32',
                ]"
              >
                {{ $t('itemDetail.tableHeader.amount') }}
              </th>
              <template v-if="tableType !== 'collections'">
                <th scope="col" class="my-th w-32">
                  {{ $t('itemDetail.tableHeader.buyer') }}
                </th>
                <th scope="col" class="my-th w-32">
                  {{ $t('itemDetail.tableHeader.seller') }}
                </th>
              </template>
              <template v-else>
                <th scope="col" class="my-th w-32">
                  {{ $t('itemDetail.tableHeader.address') }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <slot name="content-tablebody">
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
                } in itemActivities"
                :key="id"
                tag="tr"
                :class="[
                  isUserProfileTableType && 'shadow-box my-1.5 border-2',
                  tableType !== 'user-profile'
                    ? 'border-t border-grey-150 dark:border-grey-300'
                    : '',
                  'dark-mode dark-mode-duration flex items-center justify-between border-transparent hover:border-purple dark:border-grey-300 dark:hover:border-purple',
                ]"
              >
                <td class="my-td w-60 md:w-52">
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
                      :img-set="imgSet"
                    />
                    <span class="w-fit truncate"> {{ name }}</span>
                  </nuxt-link>
                </td>
                <td class="my-td w-32 text-left">
                  <LinkNearExplorer :value-id="txId" />
                </td>
                <td
                  :class="[
                    activityTypeMapping[type]?.color,
                    'my-td text-left font-semibold lg:w-36',
                    {
                      'text-left md:w-28': tableType !== 'user-profile',
                    },
                  ]"
                >
                  {{ activityTypeMapping[type]?.label }}
                </td>
                <td
                  :class="[
                    'my-th',
                    tableType !== 'user-profile' ? 'w-24' : 'w-28',
                  ]"
                >
                  {{
                    $t('timeDistance.ago', {
                      date: formatDateToDistance(new Date(date / 1000000)),
                    })
                  }}
                </td>
                <td
                  :class="[
                    'my-td flex items-center space-x-1 font-semibold',
                    tableType !== 'user-profile' ? 'w-28 xl:w-32' : 'w-32',
                  ]"
                >
                  {{ amount ? utils.format.formatNearAmount(amount, 2) : '-' }}
                  <LogoNear v-if="amount" />
                </td>

                <template v-if="tableType !== 'collections'">
                  <td class="my-td w-32 text-center">
                    {{ buyer ? formatTransactionId(buyer) : '—' }}
                  </td>
                  <td class="my-td w-32 text-center">
                    {{ seller ? formatTransactionId(seller) : '—' }}
                  </td>
                </template>
                <template v-else>
                  <td class="my-td w-32">
                    {{
                      buyer !== '' && seller !== ''
                        ? formatTransactionId(seller)
                        : buyer !== ''
                        ? formatTransactionId(buyer)
                        : '—'
                    }}
                  </td>
                </template>
              </div>
            </slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, useNuxtApp } from '#imports'

export default defineComponent({
  props: {
    activities: {
      type: Object,
      default: () => {},
    },
    tableType: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { activityTypeMapping } = useActivity()
    const { formatNumeral, formatDateToDistance } = useFormat()
    const { formatTransactionId } = useAccountIdFormat()
    const itemActivities = ref(props.activities)

    const isUserProfileTableType = computed(
      () => props.tableType === 'user-profile'
    )
    const {
      $near: { nearAPI },
    } = useNuxtApp()
    const { utils } = nearAPI

    onMounted(() => {
      // TODO not very clean, backend needs to send cleaner data
      itemActivities.value = props.activities.filter(
        (item) => item.type !== 'TRANSFER'
      )
      if (props.tableType === 'collections')
        itemActivities.value = props.activities
    })

    return {
      formatNumeral,
      formatTransactionId,
      formatDateToDistance,

      utils,
      itemActivities,
      activityTypeMapping,
      isUserProfileTableType,
    }
  },
})
</script>
<style scoped>
.my-th {
  @apply px-3 py-5 text-left text-sm font-semibold first:pl-5;
}
.my-td {
  @apply px-3 py-4 align-middle;
}
</style>
