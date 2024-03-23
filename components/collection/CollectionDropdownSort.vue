<template>
  <Listbox v-model="selectedFilter">
    <div class="relative h-full py-0.5">
      <ListboxButton
        class="shadow-box h-full w-full items-center border border-transparent px-3.5 py-2.5 active:border-purple active:bg-grey-light3 dark:border-grey-300 dark:active:bg-dark/40 sm:transition-colors sm:duration-150 sm:ease-in-out lg:flex lg:px-4"
      >
        <div
          class="block whitespace-nowrap text-left text-sm font-semibold lg:text-base"
        >
          {{ selectedFilter.name }}
          <span
            class="pointer-events-none absolute inset-y-0 right-4 flex items-center pr-2"
          >
            <IconTriangle></IconTriangle>
          </span>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="shadow-box dark-mode absolute right-0 z-40 mt-2 w-72 origin-top-right rounded-lg border border-transparent bg-white dark:border-grey-300 lg:mt-4 lg:w-full"
        >
          <ListboxOption
            v-for="filter in listFilter"
            v-slot="{ selected }"
            :key="filter.name"
            :value="filter"
            as="template"
          >
            <li
              class="relative flex cursor-pointer select-none items-center p-4 text-base font-medium first:rounded-t-xl last:rounded-b-xl hover:bg-grey-light3 hover:text-purple hover:dark:bg-black/40"
              @click="sortCollection(filter)"
            >
              <input
                type="checkbox"
                class="form-checkbox mr-2.5 h-6 w-6 rounded text-purple dark:bg-dark dark:checked:bg-purple"
                :checked="selected"
              />
              <span>{{ filter.name }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

import i18n from 'i18next'
import { defineComponent, ref, useRouteQuery } from '#imports'

import IconTriangle from '~/assets/images/icons/triangle.svg?component'

export default defineComponent({
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,

    IconTriangle,
  },

  setup() {
    const routeQuerySort = useRouteQuery('sort')
    const SORT_PLUS_PRICE = '-price'
    const SORT_MINUS_PRICE = 'price'
    const SORT_PLUS_RECENTLY = '-createdAt'

    const listFilter = [
      {
        id: 1,
        name: i18n.t('collection.filters.priceLowToHigh'),
        sort: SORT_MINUS_PRICE,
      },
      {
        id: 2,
        name: i18n.t('collection.filters.priceHighToLow'),
        sort: SORT_PLUS_PRICE,
      },
      {
        id: 3,
        name: i18n.t('collection.filters.recentlyListed'),
        sort: SORT_PLUS_RECENTLY,
      },
    ]
    const selectedFilter = ref(listFilter[0])

    const sortCollection = (sortSelected) => {
      routeQuerySort.value = sortSelected.sort
    }

    return {
      listFilter,
      selectedFilter,

      sortCollection,
    }
  },
})
</script>
