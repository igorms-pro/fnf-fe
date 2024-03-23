<template>
  <div
    class="mt-4 flex w-full flex-col items-center justify-between space-x-2 space-y-2 md:flex-row lg:flex-col lg:space-y-2 xl:flex-row xl:space-y-0"
  >
    <button
      v-if="highestOffer && highestOffer > 0"
      class="btn btn-brand dark:btn-brand-dark btn-border-b btn-base btn-xl flex w-full flex-grow justify-between border-2 border-b-4 bg-white font-bold text-black dark:text-white"
      @click="$emit('acceptHighestOffer')"
      @mouseenter="delayHover(true)"
      @mouseleave="delayHover(false)"
    >
      <span class="truncate">
        {{ $t('itemDetail.action.acceptHighestOffer') }}
      </span>
      <LogoNear
        :logo-class-name="[
          '!h-3.5 !w-3.5',
          { 'text-blue dark:text-blue': isHover },
        ]"
      >
        {{ highestOffer }}
      </LogoNear>
    </button>

    <button
      class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl w-full flex-none py-4 font-bold md:w-auto lg:w-full xl:w-auto"
      @click="$emit('cancelListing')"
    >
      {{ $t('activity.type.cancelListing') }}
    </button>
  </div>
  <p
    class="mt-3 text-xs text-grey-300 dark:text-grey-light2"
    v-html="
      $t('itemDetail.action.termOfService', {
        firstActionBtn: $t('itemDetail.action.acceptHighestOffer'),
        secondActionBtn: $t('activity.type.cancelListing'),
      })
    "
  ></p>
</template>

<script>
export default {
  props: {
    highestOffer: {
      type: String,
      default: null,
    },
  },

  emits: ['acceptHighestOffer', 'cancelListing'],

  setup() {
    const isHover = ref(false)

    // text and logo near to match hover state
    const delayHover = (value) => {
      setTimeout(() => {
        isHover.value = value
      }, 105)
    }
    return { isHover, delayHover }
  },
}
</script>
