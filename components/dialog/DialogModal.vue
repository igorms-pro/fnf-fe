<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="fixed inset-0 z-40 overflow-y-auto shadow-sm"
      :initial-focus="initialFocus"
      @close="close"
    >
      <div
        class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-purple bg-opacity-90 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
          >&#8203;</span
        >

        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="dark-mode inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6 sm:align-middle"
          >
            <div>
              <div class="">
                <div class="flex justify-between">
                  <slot name="title">
                    <DialogTitle
                      as="h3"
                      class="dark-mode w-full text-lg font-extrabold text-black"
                    >
                      <slot name="title-content"></slot>
                    </DialogTitle>
                  </slot>
                  <div class="block">
                    <button
                      type="button"
                      class="text-gray-400 hover:text-gray-500 btn-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                      @click="close"
                    >
                      <span class="sr-only">Close</span>

                      <p class="block h-4 w-4" aria-hidden="true">
                        <IconClose></IconClose>
                      </p>
                    </button>
                  </div>
                </div>

                <slot name="content" />
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import IconClose from '~/assets/images/icons/close.svg?component'

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    IconClose,
  },

  props: {
    initialFocus: { type: Object, default: null },
    isOpen: { type: Boolean, default: false },
  },

  emits: ['close'],

  setup(_, { emit }) {
    return {
      close() {
        emit('close')
      },
    }
  },
}
</script>
