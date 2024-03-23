<template>
  <div class="dark-mode sticky top-0 z-10 -mx-1 bg-white py-3 lg:py-6">
    <div class="grid grid-cols-2 gap-3 lg:flex lg:gap-0.5 lg:space-x-2">
      <div class="col-span-2 lg:flex-auto">
        <div class="flex h-14 py-0.5">
          <button
            class="btn-base btn-white shadow-box btn-center btn btn-border-purple group mr-2 rounded-lg border font-bold"
            :disabled="pending"
            @click="$emit('refreshUrl')"
          >
            <IconRefresh
              :class="[
                'h-5 w-5',
                {
                  'animate-spin text-purple outline-none focus:outline-none':
                    pending,
                },
              ]"
              :alt="$t('common.action.refresh')"
            />
          </button>

          <div
            :class="[
              isInputFocus
                ? 'border-purple'
                : 'border-transparent hover:border-purple dark:border-grey-300 dark:hover:border-purple',
              'shadow-box group relative flex h-full w-full justify-between rounded-lg border',
            ]"
          >
            <div class="dark-mode flex rounded-l-lg bg-white">
              <button
                class="mx-3 flex items-center justify-center"
                type="button"
              >
                <IconSearch />
              </button>
            </div>
            <input
              v-model="searchInput"
              :placeholder="$t('search.title')"
              class="dark-mode block h-full w-full rounded-r-lg border-none py-2 pr-2 focus:outline-none"
              @focus="isInputFocus = true"
              @blur="isInputFocus = false"
            />
            <div
              v-if="searchInput"
              class="dark-mode flex rounded-r-lg bg-white"
            >
              <button
                class="mx-3 flex items-center justify-center hover:text-purple"
                type="button"
                @click="clearSearchInput"
              >
                <IconClose />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1 h-14 py-0.5 lg:hidden lg:w-72 lg:flex-1">
        <CollectionButtonFilter
          @click="$emit('filterSidePanelToggle', !isFilterSidePanelOpen)"
        ></CollectionButtonFilter>
      </div>
      <div class="col-span-1 lg:w-72 lg:flex-1">
        <CollectionDropdownSort></CollectionDropdownSort>
      </div>

      <div class="hidden flex-none py-0.5 lg:flex">
        <button
          class="shadow-box transition-color dark-mode-duration dark-mode group cursor-pointer whitespace-nowrap rounded-r-none rounded-l-lg rounded-tr-none rounded-br-none border border-transparent bg-white p-3.5 hover:border-purple active:border-purple dark:border-y-grey-300 dark:border-l-grey-300 dark:border-r-transparent dark:hover:border-purple"
          @click="$emit('layoutGrid', '4x4')"
        >
          <IconGrid4x4 :class="{ 'text-purple': layoutGrid === '4x4' }" />
        </button>
        <button
          class="shadow-box transition-color dark-mode-duration dark-mode group cursor-pointer whitespace-nowrap rounded-l-none rounded-r-lg border border-transparent bg-white p-3.5 hover:border-purple active:border-purple dark:border-grey-300 dark:hover:border-purple"
          @click="$emit('layoutGrid', '8x8')"
        >
          <IconGrid8x8 :class="{ 'text-purple': layoutGrid === '8x8' }" />
        </button>
      </div>
    </div>
    <TransitionGroup
      v-if="Object.keys(attributes).length > 0"
      name="fade-up"
      tag="div"
      class="-mx-1 my-4 flex flex-wrap md:my-7"
    >
      <template v-for="(traits, traitType) in attributes">
        <button
          v-for="(traitValue, index) in traits"
          :key="index"
          class="transition-all duration-300 ease-linear"
          @click="removeAttribute(traitType, traitValue)"
        >
          <CollectionTags>
            {{ `${traitType}: ${traitValue}` }}
          </CollectionTags>
        </button>
      </template>

      <button
        v-if="Object.keys(attributes).length > 0"
        class="py-2.5 px-4 text-base font-semibold transition-all duration-300 ease-linear"
        @click="clearAttributes"
      >
        {{ $t('collection.filters.clearAll') }}
      </button>
    </TransitionGroup>
  </div>
</template>

<script>
import { useDebounceFn } from '@vueuse/core'
import { defineComponent } from '#imports'

import IconGrid4x4 from '~/assets/images/icons/grid-2x2.svg?component'
import IconGrid8x8 from '~/assets/images/icons/grid-3x3.svg?component'
import IconRefresh from '~/assets/images/icons/refresh.svg?component'
import IconSearch from '~/assets/images/icons/search-icon.svg?component'
import IconClose from '~/assets/images/icons/close.svg?component'

export default defineComponent({
  components: {
    IconGrid4x4,
    IconGrid8x8,
    IconRefresh,
    IconSearch,
    IconClose,
  },

  props: {
    isFilterSidePanelOpen: {
      type: Boolean,
      required: true,
    },
    layoutGrid: {
      type: String,
      default: null,
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['filterSidePanelToggle', 'layoutGrid', 'refreshUrl'],

  setup() {
    const routeQuerySearch = useRouteQuery('search')
    const isInputFocus = ref(false)
    const searchInput = ref(routeQuerySearch.value ?? '')
    const TIMEOUT = 500

    const { attributes, changeAttribute, clearAttributes } =
      useCollectionAttributes()

    const removeAttribute = (traitType, traitValue) => {
      return changeAttribute(traitType, traitValue, false)
    }

    const updateRouteQuery = useDebounceFn(() => {
      routeQuerySearch.value = searchInput.value || ''
    }, TIMEOUT)

    watch(searchInput, updateRouteQuery)

    const clearSearchInput = () => {
      searchInput.value = ''
      routeQuerySearch.value = ''
    }

    return {
      isInputFocus,
      searchInput,

      attributes,
      removeAttribute,
      clearAttributes,
      clearSearchInput,
    }
  },
})
</script>
