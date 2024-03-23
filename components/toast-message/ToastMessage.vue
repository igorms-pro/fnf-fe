<template>
  <div
    :class="[
      getTypeCls,
      'left-0 right-0 flex h-full items-center rounded-lg border border-l-[10px] border-y-transparent border-r-transparent bg-white p-5  dark:border-y-grey-300 dark:border-r-grey-300 dark:bg-dark',
    ]"
  >
    <div class="flex-col pr-8 md:pr-0">
      <div class="mb-2.5 flex">
        <img v-if="img" :src="img" class="h-6 w-6" />
        <p class="dark-mode text-base font-bold text-black">
          {{ title }}
        </p>
      </div>
      <p class="text-sm text-grey-300 dark:text-grey-light2 md:text-base">
        {{ message }}
      </p>
    </div>
    <IconClose
      class="dark-mode absolute right-8 top-4 block h-4 w-4 cursor-pointer text-black hover:text-purple md:right-4"
      @click="$emit('close-toast')"
    ></IconClose>
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import IconClose from '~/assets/images/icons/close.svg?component'

export default defineComponent({
  components: { IconClose },

  props: {
    type: {
      type: String,
      default: 'info',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
  },

  emits: ['close-toast'],

  computed: {
    getTypeCls() {
      const type = {
        success: 'border-green',
        info: 'border-blue',
        warning: 'border-[orange]',
        error: 'border-red',
      }
      return type[this.type] || type.info
    },
  },
})
</script>
