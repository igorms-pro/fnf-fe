<template>
  <div class="flex items-center space-x-1 font-semibold">
    <slot />
    <IconNear
      :class="logoClassName"
      class="ml-1.5 h-3 w-3 text-black dark:text-white"
      :alt="$t('common.near')"
    />
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import IconNear from '~/assets/images/icons/fnf/near-logo.svg?component'

export default defineComponent({
  components: {
    IconNear,
  },
  props: {
    logoClassName: {
      type: [Array, String],
    },
  },
})
</script>
