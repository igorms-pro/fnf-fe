<template>
  <DialogModal :initial-focus="initialFocus" :is-open="isOpen" @close="close">
    <template #title-content>
      {{
        actionTitle === $t('itemDetail.action.sendNFT')
          ? $t('itemDetail.action.confirmSend')
          : actionTitle
      }}
    </template>
    <template #content>
      <slot name="content-subtitle" />
      <slot name="content-send" />
      <slot name="content-list-offer">
        <div class="mt-7">
          <label
            class="mb-1.5 block text-xs font-semibold text-grey-200 dark:text-grey-light2"
          >
            {{ $t('itemDetail.tableHeader.price') }}
          </label>
          <div class="relative rounded-md md:mx-auto md:w-full">
            <input
              ref="initialFocus"
              v-model="inputPrice"
              type="number"
              :placeholder="$t('common.amount')"
              pattern="[0-9]"
              class="dark-mode block w-full rounded-md border-grey-180 py-3.5 pl-3.5 pr-10 text-sm font-bold focus:border-grey-180 focus:outline-none focus:ring-0 dark:border-grey-300 dark:focus:border-grey-300 md:py-3 md:text-base"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5"
            >
              <LogoNear logo-class-name="text-sm font-semibold" />
            </div>
          </div>
        </div>
      </slot>
      <div class="mt-16 text-center">
        <button
          :disabled="isDisabled"
          class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl w-full text-sm font-bold md:text-base"
          @click="submit"
        >
          <span> {{ actionTitle }} </span>
        </button>
      </div>
    </template>
  </DialogModal>
</template>

<script>
import i18n from 'i18next'
import { ref } from '#imports'

export default {
  props: {
    isOpen: { type: Boolean, default: false },
    actionTitle: {
      type: String,
      default: i18n.t('itemDetail.action.makeOffer'),
    },
    hasError: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['close', 'submit'],

  async setup(props, { emit }) {
    const initialFocus = ref(null)
    const inputPrice = ref(null)
    const isDisabled = ref(props.hasError)

    // TODO - fuse to one watch, idk  how to do yet
    watch(props, () => {
      // update from parent
      if (props.actionTitle === i18n.t('itemDetail.action.sendNFT')) {
        isDisabled.value = props.hasError
      }
    })

    watch(
      () => inputPrice.value,
      (newValue) => {
        // TODO - need to check available near balance
        if (!newValue) isDisabled.value = true
        else isDisabled.value = false
      }
    )
    return {
      initialFocus,
      inputPrice,
      isDisabled,

      submit() {
        // TODO: rename emit event name "submit" to more appropriate name
        emit('submit', inputPrice.value)
      },

      close() {
        emit('close')
      },
    }
  },
}
</script>
