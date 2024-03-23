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
      class="my-1 flex space-x-1 truncate text-sm font-semibold text-purple"
    >
      <span class="truncate"> {{ $t('collection.verifiedListing') }}</span>
      <IconListing class="h-5 w-5 text-purple"></IconListing>
    </p>
    <p v-else class="my-1 truncate text-sm font-semibold text-purple">
      {{ $t('collection.unverifiedCollection') }}
    </p>
    <LogoNear v-if="formattedPrice" class="text-base">
      {{ formattedPrice }}
    </LogoNear>
    <slot name="actionButton">
      <button
        v-if="isOnSale"
        class="btn btn-primary btn-border-primary btn-base mt-2 w-full border-2"
      >
        {{ $t('itemDetail.action.viewListing') }}
      </button>
      <button
        v-else
        class="btn btn-primary btn-border-primary btn-base mt-2 w-full border-2"
      >
        {{ $t('itemDetail.action.listNow') }}
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
      required: true,
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
    isOnSale: {
      type: Boolean,
      default: false,
    },
    price: {
      type: String,
      default: null,
    },
    imgSet: {
      type: Array,
    },
  },

  setup(props) {
    const formattedPrice = computed(() => {
      if (props.price === null || props.price <= 0) return null // hide price if null or <= 0
      const formatPrice = formatNearAmount(props.price ?? 0)
      return formatPrice
    })

    return {
      formattedPrice,
    }
  },
})
</script>
