<template>
  <transition name="slidedown">
    <section
      v-if="open"
      :class="[bgColor, 'p-4 px-5 text-white md:py-6 lg:px-32']"
    >
      <div
        class="container relative flex flex-col lg:flex-row lg:justify-between"
      >
        <div class="flex flex-col space-y-3">
          <p class="pr-2 text-lg font-extrabold lg:pr-0 lg:text-2xl">
            <slot name="title" />
          </p>
          <p class="text-sm lg:text-base"><slot name="text" /></p>
        </div>
        <div
          class="mt-3 flex flex-row-reverse items-center justify-end lg:mt-0 lg:flex-row lg:space-x-5"
        >
          <slot name="buttonLearn" />
          <slot name="button" />

          <button
            class="absolute top-0 right-0 h-3 w-3 cursor-pointer whitespace-nowrap lg:relative"
            @click="open = false"
          >
            <img
              src="~/assets/images/icons/close.svg"
              alt="close"
              class="h-3 w-3"
            />
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import { defineComponent, useNuxtApp } from '#imports'

export default defineComponent({
  props: {
    bgColor: {
      type: String,
      default: 'bg-purple',
    },
  },
  setup() {
    const {
      $near: { isSignedIn },
    } = useNuxtApp()
    const open = ref(true)

    return {
      isSignedIn,

      open,
    }
  },
})
</script>
