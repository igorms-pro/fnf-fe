<template>
  <div
    class="my-4 rounded-lg border border-grey-light2 p-4 dark:border-grey-300"
  >
    <p class="mb-3 text-xs text-grey-200 dark:text-grey-light2">
      {{ $t('itemDetail.section.currentPrice') }}
    </p>
    <div class="flex items-center">
      <IconTag class="mr-2 hidden h-4 w-4 dark:text-purple lg:block" />

      <LogoNear v-if="isForSale" logo-class-name="!h-3.5 !w-3.5">
        {{ formatNumeral(price) }}
      </LogoNear>

      <!-- TODO: not for sale integration -->
      <span v-else>Not for Sale</span>
    </div>
    <slot name="content-actions-buttons" />
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import IconTag from '~/assets/images/icons/tag.svg?component'

export default defineComponent({
  components: {
    IconTag,
  },
  props: {
    isForSale: {
      type: Boolean,
      default: false,
    },

    price: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { formatNumeral } = useFormat()
    return { formatNumeral }
  },
})
</script>
