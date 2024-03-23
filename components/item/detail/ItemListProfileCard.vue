<template>
  <BaseImg :media="media" :alt="name" :class="[sizeImg, 'rounded-lg']" />
  <div class="truncate pl-2 text-left font-semibold">
    <p class="truncate text-base group-hover:text-purple">
      {{ name }}
    </p>
    <p
      class="mt-2 flex items-center space-x-1 text-sm text-grey-300 group-hover:text-purple dark:text-grey-light2"
    >
      <nuxt-link
        :alt="name"
        :to="{
          name: 'collection-id',
          params: { id: collectionAccountId ?? 0 },
        }"
        class="truncate text-purple"
      >
        {{ collectionName }}
      </nuxt-link>
      <!-- TODO: isVerified for collections? -->
      <IconVerifiedMacaron v-if="isVerified" class="text-purple" />
    </p>
  </div>
</template>

<script>
import IconVerifiedMacaron from '~/assets/images/icons/verified-macaron.svg?component'

export default {
  components: {
    IconVerifiedMacaron,
  },
  props: {
    media: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    collectionAccountId: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    sizeImg: {
      type: String,
      required: false,
      default: 'h-20 w-20',
    },
  },
}
</script>
