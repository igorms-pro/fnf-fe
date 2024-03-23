<template>
  <div class="mt-4 md:flex md:items-center md:space-x-2">
    <button
      class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl mb-3 w-full font-bold md:mb-0 lg:w-1/2"
      @click="$emit('buy')"
    >
      {{ $t('itemDetail.action.buyNow') }}
    </button>

    <button
      v-if="!isBid"
      class="btn btn-brand dark:btn-brand-dark btn-border-b btn-base btn-xl w-full border-2 border-b-4 bg-white font-bold lg:w-1/2"
      @click="
        ;(actionModalOpen = true),
          (actionTitle = $t('itemDetail.action.makeOffer'))
      "
    >
      {{ $t('itemDetail.action.makeOffer') }}
    </button>
    <button
      v-else
      class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl w-full flex-none py-4 font-bold lg:w-1/2"
      @click="$emit('canceloffer')"
    >
      {{ $t('itemDetail.action.cancelOffer') }}
    </button>
    <DialogItemDetailAction
      :is-open="actionModalOpen"
      :action-title="actionTitle"
      @close="actionModalOpen = false"
      @submit="$emit('offer', $event)"
    >
    </DialogItemDetailAction>
  </div>
  <p
    class="mt-3 text-xs text-grey-300 dark:text-grey-light2"
    v-html="
      $t('itemDetail.action.termOfService', {
        firstActionBtn: $t('itemDetail.action.buyNow'),
        secondActionBtn: $t(
          `itemDetail.action.${isBid ? 'cancelOffer' : 'makeOffer'}`
        ),
      })
    "
  ></p>
</template>

<script>
import { ref } from '#imports'

export default {
  props: {
    isBid: {
      type: Boolean,
    },
  },
  emits: ['offer', 'buy', 'canceloffer'],
  setup() {
    const actionModalOpen = ref(false)
    const actionTitle = ref('')

    return {
      actionModalOpen,
      actionTitle,
    }
  },
}
</script>
