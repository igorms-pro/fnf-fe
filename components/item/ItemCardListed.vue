<template>
  <nuxt-link
    :alt="name"
    :to="{
      name: 'item-detail-contractId-id',
      params: { contractId, id: tokenSeriesId },
    }"
    class="block"
  >
    <div class="relative pb-[100%]">
      <div class="absolute inset-0">
        <BaseImg
          :media="media"
          :alt="name"
          class="flex h-full w-full items-center justify-center rounded-lg object-cover align-middle"
          :img-set="imgSet"
        />
      </div>
    </div>
    <p class="mt-2.5 truncate font-semibold">
      {{ name }}
    </p>
    <p
      v-if="isVerified"
      class="my-1 flex space-x-1 text-sm font-semibold text-purple"
    >
      <span> {{ $t('collection.verifiedListing') }}</span>
      <IconListing class="h-5 w-5 text-purple"></IconListing>
    </p>
    <p v-else class="my-1 truncate text-sm font-semibold text-purple">
      {{ $t('collection.unverifiedCollection') }}
    </p>

    <LogoNear v-if="price > 0" class="text-base">
      {{ formatNearAmount(price) }}
    </LogoNear>

    <slot name="actionButton">
      <button
        class="btn btn-primary btn-border-primary btn-base mt-2 block w-full border-2 text-center"
        @click="cancelListing"
      >
        Cancel listing
      </button>
    </slot>
  </nuxt-link>
</template>

<script>
import { formatNearAmount } from 'near-api-js/lib/utils/format'
import { defineComponent } from '#imports'
import IconListing from '~/assets/images/icons/verified-macaron.svg?component'

export default defineComponent({
  components: {
    IconListing,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    contractId: {
      type: String,
      required: true,
    },
    tokenSeriesId: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    price: {
      type: String,
      default: '0',
    },
    imgSet: {
      type: Array,
    },
  },

  setup(props) {
    const { removeSale } = useContractMarket()

    const cancelListing = () => {
      removeSale(props.contractId, props.tokenSeriesId)
    }

    return {
      cancelListing,
      formatNearAmount,
    }
  },
})
</script>
