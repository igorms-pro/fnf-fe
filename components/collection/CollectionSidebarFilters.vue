<template>
  <div
    :class="[
      isFilterSidePanelOpen ? 'w-full lg:ml-0' : 'w-0 lg:-ml-60',
      'dark-mode fixed top-0 z-30 h-full flex-none overflow-y-auto bg-white lg:sticky lg:top-0 lg:w-72 lg:overflow-y-auto lg:transition-all lg:duration-700 lg:ease-in-out',
    ]"
  >
    <div class="dark-mode dark-mode-duration h-full bg-white">
      <div
        class="relative flex items-center justify-between border-b border-grey-light px-5 py-5 text-base font-semibold dark:border-grey-300"
      >
        <div>
          <IconFilter class="mr-3 inline-flex"></IconFilter>
          {{ $t('collection.filters.title') }}
        </div>
        <button
          type="button"
          class="absolute right-0 z-50 flex h-16 w-12 items-center justify-center transition-transform duration-700 ease-linear"
          title="Open control panel"
          @click="$emit('filterSidePanelToggle', !isFilterSidePanelOpen)"
        >
          <IconArrowLeft
            :class="[isFilterSidePanelOpen ? '' : ' rotate-180']"
          ></IconArrowLeft>
        </button>
      </div>
      <div v-show="isFilterSidePanelOpen">
        <Disclosure v-slot="{ open }" :default-open="true">
          <DisclosureButton
            :class="[
              {
                'border-b border-grey-light bg-grey-100 dark:border-grey-300  dark:bg-black/40':
                  open,
              },
              'flex w-full items-center justify-between p-5',
            ]"
          >
            <span class="text-base font-semibold">{{
              $t('collection.filters.status')
            }}</span>
            <IconTriangle
              :class="[
                open ? 'rotate-180' : '',
                'duration-2000 transition-transform ease-linear',
              ]"
            ></IconTriangle>
          </DisclosureButton>
          <DisclosurePanel
            class="flex items-center justify-between border-b border-grey-light p-5 dark:border-grey-300"
          >
            <label class="text-base font-semibold">{{
              $t('itemDetail.action.buyNow')
            }}</label>
            <slot name="buyNowToggle"></slot>
          </DisclosurePanel>
        </Disclosure>
        <template
          v-for="{ trait_type: traitType, unique_values: traits } in attributes"
          :key="traitType"
        >
          <Disclosure v-slot="{ open }" :default-open="false">
            <DisclosureButton
              :class="[
                {
                  'border-b border-t border-grey-light bg-grey-100 dark:border-grey-300 dark:bg-black/40':
                    open,
                },
                'flex w-full items-center justify-between p-5 capitalize',
              ]"
            >
              <span class="text-base font-semibold">{{ traitType }}</span>
              <IconTriangle
                :class="[
                  { 'rotate-180': open },
                  'duration-2000 transition-transform ease-linear',
                ]"
              ></IconTriangle>
            </DisclosureButton>
            <DisclosurePanel
              class="border-b border-grey-light px-0 pb-5 pt-0 dark:border-grey-300"
            >
              <CollectionSearchFilter
                :initial-traits="traits"
                :trait-type="traitType"
              />
            </DisclosurePanel>
          </Disclosure>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { defineComponent } from '#imports'

import IconTriangle from '~/assets/images/icons/triangle.svg?component'
import IconArrowLeft from '~/assets/images/icons/arrow-left.svg?component'
import IconFilter from '~/assets/images/icons/filter.svg?component'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,

    IconTriangle,
    IconArrowLeft,
    IconFilter,
  },

  props: {
    attributes: {
      type: Array,
      required: true,
    },
    isFilterSidePanelOpen: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['filterSidePanelToggle'],

  setup() {
    const isSale = ref(false)

    const { attributes: selectedAttributes } = useCollectionAttributes()

    return {
      isSale,

      selectedAttributes,
    }
  },
})
</script>
