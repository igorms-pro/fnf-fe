<template>
  <section
    :class="[
      isUserProfileTableType
        ? 'shadow-box border-2'
        : 'border-t border-grey-150 dark:border-grey-300',
      'dark-mode dark-mode-duration flex space-x-3 truncate border-transparent px-3 py-5 hover:border-purple dark:border-grey-300 dark:hover:border-purple',
    ]"
  >
    <BaseImg
      class="h-12 w-12 rounded"
      :src="img"
      :alt="name"
      :img-set="imgSet"
    />
    <div class="grow truncate" @click.stop>
      <div class="flex items-center justify-between">
        <nuxt-link
          class="truncate font-semibold"
          :to="{
            name: 'item-detail-contractId-id',
            params: { contractId, id: id },
          }"
        >
          <h3 class="truncate font-semibold">{{ name }}</h3>
        </nuxt-link>
        <p class="text-xs text-grey-200 dark:text-grey-light2">
          {{
            $t('timeDistance.ago', {
              date: formatDateToDistance(new Date(Number(date) / 1000000)),
            })
          }}
        </p>
      </div>
      <slot name="content-activity-type">
        <p
          class="mt-3.5 text-xs font-semibold text-grey-200 dark:text-grey-light2"
        >
          {{ $t('itemDetail.tableHeader.transactionID') }}
        </p>

        <LinkNearExplorer
          :value-id="txId"
          class="dark-mode mt-2 truncate text-sm font-normal text-black"
        />
        <div class="mt-3.5 flex justify-between">
          <div class="w-1/2 space-y-2">
            <p
              class="text-xs font-semibold text-grey-200 dark:text-grey-light2"
            >
              {{ $t('itemDetail.tableHeader.type') }}
            </p>
            <!-- todo: different color depends on the type  -->
            <p
              :class="[
                activityTypeMapping[type]?.color,
                'text-sm font-semibold text-black',
              ]"
            >
              {{ activityTypeMapping[type]?.label }}
            </p>
          </div>
          <div
            class="w-1/2 space-y-2 border-l border-l-grey-light pl-3.5 dark:border-l-grey-300"
          >
            <p
              class="text-xs font-semibold text-grey-200 dark:text-grey-light2"
            >
              {{ $t('itemDetail.tableHeader.amount') }}
            </p>
            <LogoNear v-if="amount" class="text-sm">
              {{ utils.format.formatNearAmount(amount, 2) }}
            </LogoNear>
          </div>
        </div>
        <div
          v-if="tableType !== 'collections'"
          class="mt-5 flex justify-between"
        >
          <div class="w-1/2 space-y-2 truncate pr-3.5">
            <p
              class="text-xs font-semibold text-grey-200 dark:text-grey-light2"
            >
              {{ $t('itemDetail.tableHeader.buyer') }}
            </p>
            <!-- TODO backend needs to send tx address -->
            <p class="dark-mode truncate text-sm font-semibold text-black">
              <!-- {{ buyer ? formatTransactionId(buyer) : '—' }} -->
              {{ buyer ? formatTransactionId(buyer) : '—' }}
            </p>
          </div>
          <div
            class="w-1/2 space-y-2 border-l border-l-grey-light pl-3.5 dark:border-l-grey-300"
          >
            <p
              class="text-xs font-semibold text-grey-200 dark:text-grey-light2"
            >
              {{ $t('itemDetail.tableHeader.seller') }}
            </p>
            <!-- TODO backend needs to send tx address -->
            <p class="dark-mode truncate text-sm font-semibold text-black">
              {{ seller ? formatTransactionId(seller) : '—' }}
            </p>
          </div>
        </div>
        <div v-else>
          <p class="text-xs font-semibold text-grey-200 dark:text-grey-light2">
            {{ $t('itemDetail.tableHeader.address') }}
          </p>
          {{
            buyer && seller
              ? formatTransactionId(seller)
              : formatTransactionId(buyer)
          }}
        </div>
      </slot>
    </div>
  </section>
</template>

<script>
import { formatDistance, formatRelative, sub, subDays } from 'date-fns'
import { defineComponent, useNuxtApp } from '#imports'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    contractId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    txId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'Listing',
    },
    amount: {
      type: String,
      default: '0',
    },
    buyer: {
      type: String,
      default: null,
    },
    seller: {
      type: String,
      default: null,
    },
    tableType: {
      type: String,
      required: false,
    },
    imgSet: {
      type: Array,
    },
  },

  setup(props) {
    const { activityTypeMapping } = useActivity()
    const { formatNumeral, formatDateToDistance } = useFormat()
    const { formatTransactionId } = useAccountIdFormat()

    const isUserProfileTableType = computed(
      () => props.tableType === 'user-profile'
    )

    const {
      $near: { nearAPI },
    } = useNuxtApp()
    const { utils } = nearAPI

    return {
      formatDateToDistance,
      formatTransactionId,
      formatRelative,
      formatDistance,
      formatNumeral,
      subDays,
      sub,

      activityTypeMapping,
      isUserProfileTableType,
      utils,
    }
  },
})
</script>
