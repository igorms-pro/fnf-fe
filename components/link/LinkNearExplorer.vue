<template>
  <NuxtLink
    :to="`${EXPLORER_URL}/${valueType}/${valueId}`"
    target="_blank"
    class="appearance-none hover:text-purple"
  >
    <slot>
      {{ formatTransactionId(valueId) }}
    </slot>
  </NuxtLink>
</template>

<script>
import { defineComponent, useNuxtApp } from '#imports'

export default defineComponent({
  props: {
    valueId: {
      type: String,
      required: true,
    },
    valueType: {
      type: String,
      required: false,
      default: 'txns',
    },
  },
  setup() {
    const { formatTransactionId } = useAccountIdFormat()

    const {
      $near: { self },
    } = useNuxtApp()

    const EXPLORER_URL = self.value.config.explorerUrl
    // TODO get from config,  production or test link
    return {
      formatTransactionId,

      EXPLORER_URL,
    }
  },
})
</script>
