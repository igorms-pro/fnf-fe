<template>
  <nuxt-link
    :alt="name"
    :to="{ name: 'collection-id', params: { id: accountId } }"
    class="max-w-80 lg:animate-up-hover lg:hover:border-few-and-far-color lg:dark:hover:border-few-and-far-color-dark group block rounded-t-xl rounded-b-3xl border-x-2 border-b-8 border-t-2 border-transparent pb-3 text-center"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="my-auto">
        <BaseImg
          :media="img"
          :alt="name"
          :img-set="imgSet"
          class="w-full rounded-lg duration-100 ease-linear group-hover:rounded-b-none"
        />
      </div>
      <div class="px-2">
        <p class="mt-2.5 truncate font-semibold">
          {{ name }}
        </p>
        <p
          :class="{ 'text-purple': isVerified }"
          class="mt-2 flex justify-center space-x-1 text-sm font-semibold"
        >
          <span class="truncate"> {{ accountId ? accountId : '--' }} </span>
          <IconListing
            v-if="isVerified"
            alt="Verified Listing"
            class="w-8"
          ></IconListing>
        </p>
        <p
          class="my-2.5 text-center text-base text-grey-300 line-clamp-2 dark:text-grey-light2"
        >
          {{ desc }}
        </p>
      </div>
    </div>
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
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    imgSet: {
      type: Array,
    },
  },
})
</script>
