<template>
  <nuxt-link
    :alt="name"
    :to="
      collectionType === UPCOMING
        ? twitter
        : { name: 'collection-id', params: { id: accountId } }
    "
    :target="collectionType === UPCOMING ? '_blank' : '_self'"
    class="block"
  >
    <div class="relative pb-[100%]">
      <div class="absolute inset-0">
        <BaseImg
          :media="img"
          :alt="name"
          class="flex h-full w-full items-center justify-center rounded-lg object-cover align-middle"
          :img-set="imgSet"
        />
      </div>
    </div>
    <p class="mt-2.5 truncate font-semibold">{{ name }}</p>
    <p
      v-if="isVerified"
      class="my-1 flex space-x-1 text-sm font-semibold text-purple"
    >
      <span class="truncate"> {{ $t('collection.verifiedListing') }}</span>
      <IconListing class="h-5 w-5 text-purple"></IconListing>
    </p>
    <p v-else class="truncate text-sm font-semibold text-purple">
      {{ $t('collection.unverifiedCollection') }}
    </p>
    <LogoNear v-if="price" class="text-base">
      {{ formatNumeral(price) }}
    </LogoNear>

    <slot name="actionButton"> </slot>
  </nuxt-link>
</template>

<script>
import { defineComponent } from '#imports'
import IconListing from '~/assets/images/icons/verified-macaron.svg?component'

export default defineComponent({
  components: {
    IconListing,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    collectionType: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      default: '',
    },
    accountId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: null,
    },
    imgSet: {
      type: Array,
    },
  },
  setup() {
    const { formatNumeral } = useFormat()
    const UPCOMING = 'upcoming'
    return {
      formatNumeral,
      UPCOMING,
    }
  },
})
</script>
