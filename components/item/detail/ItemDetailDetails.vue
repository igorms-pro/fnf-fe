<template>
  <ItemDetailSectionCard>
    <template #content-title>
      <IconDetails class="mr-2 h-5 w-5" />
      <p class="font-semibold">
        {{ $t('itemDetail.section.details') }}
      </p>
    </template>

    <template #content-section>
      <hr
        class="border-px -mt-4 w-full border-grey-light2 dark:border-grey-300"
      />
      <ul class="text-sm">
        <li class="flex justify-between py-6 dark:border-grey-300">
          <span> {{ $t('itemDetail.mintAddress') }} </span>
          <span class="truncate">
            {{ formatAccountId(contractId) }}
          </span>
        </li>
        <li
          class="flex justify-between border-t border-t-grey-150 py-6 dark:border-grey-300"
        >
          <span class="w-1/2"> {{ $t('common.owner') }} </span>
          <span class="truncate">
            {{ ownerId ? formatAccountId(ownerId) : '—' }}
          </span>
        </li>

        <li
          class="flex justify-between border-t border-t-grey-150 py-6 dark:border-grey-300"
        >
          <span class="w-1/2"> {{ $t('itemDetail.creatorRoyalties') }} </span>
          <span class="truncate">
            {{ formattedPercent ? `${formattedPercent}%` : '' }}
          </span>
        </li>
        <li
          class="flex justify-between border-t border-t-grey-150 pt-6 pb-3 dark:border-grey-300"
        >
          <span class="w-1/2"> {{ $t('itemDetail.transactionFee') }} </span>
          <span class="truncate"> 2% </span>
        </li>
      </ul>
    </template>
  </ItemDetailSectionCard>
</template>

<script>
import { defineComponent, useAccountIdFormat } from '#imports'
import IconDetails from '~/assets/images/icons/details.svg?component'

export default defineComponent({
  components: {
    IconDetails,
  },
  props: {
    contractId: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    royalty: {
      type: Object,
    },
  },
  setup(props) {
    const { formatAccountId } = useAccountIdFormat()

    const formattedPercent = computed(() =>
      Object.keys(props.royalty).length === 0
        ? null
        : Object.values(props.royalty).reduce(
            (a, b) => parseInt(a) + parseInt(b)
          ) / 100
    )

    return {
      formatAccountId,

      formattedPercent,
    }
  },
})
</script>
