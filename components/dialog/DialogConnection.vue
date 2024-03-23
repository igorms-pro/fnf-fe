<template>
  <DialogModal :initial-focus="initialFocus" :is-open="isOpen" @close="close">
    <template #title-content>
      <DialogTitle
        as="h3"
        class="dark-mode mt-3 w-2/3 text-lg font-extrabold text-black"
      >
        {{ $t('dialog.connection.title') }}
      </DialogTitle>
    </template>

    <template #content>
      <div class="group mt-6 flex flex-col justify-center">
        <button
          ref="initialFocus"
          class="flex w-full items-center justify-between rounded-md border-2 border-grey-light p-4 hover:rounded-md hover:border-purple hover:text-purple dark:border-grey-300"
          @click="signIn(successUrl, failUrl)"
        >
          <span class="text-lg font-extrabold">
            {{ $t('dialog.connection.nearWallet') }}
          </span>
          <LogoNear logo-class-name="!h-[22px] !w-[22px]" />
        </button>
      </div>

      <div class="mt-8 text-center">
        <p class="text-base font-extrabold">
          {{ $t('dialog.connection.newToNear') }}
        </p>
        <nuxt-link
          class="mt-1 text-sm text-grey-400 hover:text-purple dark:text-grey-light2"
          href="https://near.org/blog/getting-started-with-the-near-wallet/"
          target="_blank"
        >
          {{ $t('dialog.connection.newToNearDesc') }}
        </nuxt-link>
      </div>
    </template>
  </DialogModal>
</template>

<script>
import { DialogTitle } from '@headlessui/vue'
import { useNuxtApp } from '#imports'

export default {
  components: {
    DialogTitle,
  },

  props: {
    isOpen: { type: Boolean, default: false },
    successUrl: { type: String, default: null },
    failUrl: { type: String, default: null },
  },

  emits: ['close'],

  setup(_, { emit }) {
    const {
      $near: { signIn },
    } = useNuxtApp()

    const initialFocus = ref(null)

    return {
      signIn,
      initialFocus,

      close() {
        emit('close')
      },
    }
  },
}
</script>
