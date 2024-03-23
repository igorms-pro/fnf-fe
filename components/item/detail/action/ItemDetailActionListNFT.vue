<template>
  <div class="mt-4 flex space-x-2 md:items-center">
    <button
      class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl w-1/2 font-bold"
      @click=";(actionModalOpen = true), (actionTitle = ACTION_LIST_ITEM)"
    >
      {{ $t('itemDetail.action.listItem') }}
    </button>

    <button
      class="btn btn-brand btn-border-b btn-base dark:btn-brand-dark btn-xl w-1/2 border-2 border-b-4 bg-white font-bold"
      @click=";(actionModalOpen = true), (actionTitle = ACTION_SEND_ITEM)"
    >
      {{ $t('itemDetail.action.sendNFT') }}
    </button>

    <DialogItemDetailAction
      :is-open="actionModalOpen"
      :action-title="
        actionTitle === ACTION_LIST_ITEM
          ? $t('itemDetail.action.listItem')
          : $t('itemDetail.action.sendNFT')
      "
      :has-error="hasError"
      @close="actionModalOpen = false"
      @submit="submit"
    >
      <template v-if="actionTitle === ACTION_LIST_ITEM" #content-subtitle>
        <div class="mt-6 flex items-center space-x-1">
          <ItemListProfileCard
            :media="media"
            :name="name"
            :collection-name="collectionName"
            :collection-account-id="collectionAccountId"
            :is-verified="isVerified"
            :size-img="'h-14 w-14'"
            :img-set="imgSet"
          />
        </div>
      </template>

      <!-- Empty price label and input number For List or Offer modal -->
      <template v-if="actionTitle === ACTION_SEND_ITEM" #content-list-offer>
        {{}}
      </template>
      <!-- Content send -->
      <template v-if="actionTitle === ACTION_SEND_ITEM" #content-send>
        <div class="mt-6 items-center space-x-1">
          <p
            class="text-sm md:text-base"
            v-html="
              $t('itemDetail.action.sendDescription', {
                name: name,
              })
            "
          ></p>

          <div class="mt-5">
            <label
              class="mb-1.5 block text-xs font-semibold text-grey-200 dark:text-grey-light2"
            >
              {{ $t('itemDetail.walletAddress') }}
            </label>
            <div class="relative rounded-md md:mx-auto md:w-full">
              <input
                v-model="receiverId"
                type="text"
                :placeholder="$t('itemDetail.action.sendPlaceHolder')"
                :class="[
                  'dark-mode block w-full rounded-md border-grey-180 px-3.5 text-sm font-bold focus:border-grey-180  focus:ring-0 dark:border-grey-300 dark:focus:border-grey-300 md:py-3 md:text-base',
                  {
                    'border border-red focus:border-red dark:border-red dark:focus:border-red':
                      hasError && receiverId !== '',
                  },
                ]"
              />
              <p
                v-if="hasError && receiverId !== ''"
                class="mt-2 text-xs text-red dark:text-red"
              >
                {{ $t('itemDetail.error.wrongNearAccount') }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </DialogItemDetailAction>
  </div>
  <p
    :disabled="hasError || receiverId === ''"
    class="mt-3 text-xs text-grey-300 dark:text-grey-light2"
    v-html="
      $t('itemDetail.action.termOfService', {
        firstActionBtn: $t('itemDetail.action.listItem'),
        secondActionBtn: $t('itemDetail.action.sendNFT'),
      })
    "
  ></p>
</template>

<script>
import i18n from 'i18next'
import { ref } from '#imports'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      default: '',
    },
    collectionAccountId: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    imgSet: {
      type: Array,
    },
  },
  emits: ['submit'],

  setup(_, { emit }) {
    const actionModalOpen = ref(false)
    const actionTitle = ref('')
    const receiverId = ref('')
    const hasError = ref(true)
    const ACTION_LIST_ITEM = 'LIST_ITEM'
    const ACTION_SEND_ITEM = 'SEND_ITEM'
    const { isNearWallet } = useAccountIdFormat()

    watch(
      () => receiverId.value,
      (newValue) => {
        if (!isNearWallet(receiverId.value) && newValue !== '')
          hasError.value = true
        else hasError.value = false
      }
    )

    return {
      ACTION_LIST_ITEM,
      ACTION_SEND_ITEM,

      actionModalOpen,
      actionTitle,
      receiverId,
      hasError,

      submit(price) {
        actionModalOpen.value = false

        emit('submit', {
          action: actionTitle.value,
          price,
          receiverId: receiverId.value,
        })
      },
    }
  },
}
</script>
