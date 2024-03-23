<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="fixed inset-0 z-30 overflow-y-auto shadow-sm"
      @close="$emit('close')"
    >
      <div
        class="container flex min-h-screen items-center justify-center pt-4 text-center sm:block sm:p-0"
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
            class="fixed inset-0 bg-transparent bg-opacity-60 transition-opacity"
          />
        </TransitionChild>

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
            class="dark-mode absolute left-0 right-0 bottom-0 inline-block h-[calc(100%-theme(space.20))] w-full transform overflow-y-auto bg-white pt-5 pb-4 align-bottom opacity-[98%] shadow-xl transition-all md:py-0"
          >
            <div class="mx-auto w-10/12">
              <div class="flex items-baseline pt-5">
                <input
                  v-model="searchInput"
                  type="text"
                  class="mr-1 block w-full border-0 border-b border-b-black/10 text-lg font-semibold placeholder:text-grey-200 focus:border-b-black/10 focus:outline-none focus:ring-0 dark:border-b-grey-300 dark:bg-transparent dark:placeholder:text-grey-300 dark:focus:border-b-grey-300 md:py-4 md:text-4xl"
                  :placeholder="$t('search.modalPlaceHolder')"
                />
                <div class="sm:block">
                  <button
                    class="btn-rounded btn-icon-base shadow-box btn-border-purple ml-2 border-2"
                    @click="closeDialog()"
                  >
                    <IconClose></IconClose>
                  </button>
                </div>
              </div>
            </div>

            <div
              :class="[
                { 'lg:grid-cols-1': definedGridCols === 1 },
                { 'lg:grid-cols-2': definedGridCols === 2 },
                { 'lg:grid-cols-3': definedGridCols >= 3 },
                'mx-auto w-10/12 pt-4 lg:grid lg:grid-flow-col lg:gap-5',
              ]"
            >
              <SearchResultItems
                v-if="searchResult.collections.length > 0"
                :title="$t('home.collections.title')"
                :type="ITEM_TYPE.COLLECTION"
                :search-items="searchResult.collections"
              />
              <!-- TODO: Add back in once we make public profiles -->
              <!-- <SearchResultItems
                v-if="searchResult.profiles.length > 0"
                :title="$t('profile.searchResultsTitle')"
                :type="ITEM_TYPE.PROFILE"
                :search-items="searchResult.profiles"
              /> -->
              <SearchResultItems
                v-if="searchResult.items.length > 0"
                :type="ITEM_TYPE.ITEM"
                :title="$t('collection.section.items.title')"
                :search-items="searchResult.items"
              />
            </div>
            <p
              v-if="showNoResult && searchInput.length > 0"
              class="mx-auto mt-5 font-semibold"
              readonly
              type="white"
            >
              {{ $t('search.noResults') }}
            </p>
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
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import { useDebounceFn } from '@vueuse/core'

import IconClose from '~/assets/images/icons/close.svg?component'

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,

    IconClose,
  },

  props: {
    isOpen: { type: Boolean, default: false },
  },

  emits: ['close'],

  setup(_, { emit }) {
    const { $fetch } = useNuxtApp()

    const ITEM_TYPE = {
      COLLECTION: 'collection',
      PROFILE: 'profile',
      ITEM: 'item',
    }
    const TIMEOUT = 400

    const searchInput = ref('')
    const resultCollections = ref([])
    const resultItems = ref([])
    const resultProfiles = ref([])

    const clearResults = () => {
      resultCollections.value = []
      resultItems.value = []
      resultProfiles.value = []
    }

    const closeDialog = () => {
      emit('close')
      clearResults()
      searchInput.value = ''
    }

    const performSearchDebounced = useDebounceFn(async () => {
      clearResults()
      const [resCollections, resItems, resProfiles] = await Promise.all([
        $fetch(`/collection?search=${searchInput.value}`),
        $fetch(`/nft?search=${searchInput.value}`),
        $fetch(`/profile?search=${searchInput.value}`),
      ])

      resultCollections.value = resCollections ?? []
      resultItems.value = resItems ?? []
      resultProfiles.value = resProfiles.docs
        ? res.profiles.docs ?? []
        : resProfiles ?? []
    }, TIMEOUT)

    // perform the searches with a 1s debounce
    watch(searchInput, () => {
      if (searchInput.value.length >= 3) {
        performSearchDebounced()
      } else {
        clearResults()
      }
    })

    const searchResult = computed(() => {
      return {
        collections:
          resultCollections.value?.map(
            ({
              collectionId,
              collectionName,
              description,
              media,
              isVerified,
            }) => ({
              id: collectionId,
              name: collectionName ?? '',
              description: description ?? '',
              media,
              isVerified,
            })
          ) ?? [],

        items:
          resultItems.value?.map(
            ({
              tokenSeriesId,
              contractId,
              isVerified,
              metadata: { title, description, media },
            }) => ({
              id: tokenSeriesId,
              contractId,
              name: title ?? '',
              description: description ?? '',
              media,
              isVerified,
            })
          ) ?? [],

        profiles:
          resultProfiles.value?.map(({ _id, bio, displayName }) => ({
            id: _id, // TODO: ask Cristian to get accountId here
            name: displayName ?? _id ?? '',
            description: bio ?? '',
            media: null,
            // TODO: Pass through when profiles are public if we decide to have verified profiles
            isVerified: false,
          })) ?? [],
      }
    })

    const definedGridCols = computed(() => {
      return Object.values(searchResult.value).filter(
        (value) => value.length > 0
      ).length
    })

    const showNoResult = computed(
      () =>
        searchResult.value.collections.length === 0 &&
        searchResult.value.profiles.length === 0 &&
        searchResult.value.items.length === 0
    )

    return {
      ITEM_TYPE,

      searchInput,
      searchResult,
      showNoResult,
      definedGridCols,

      clearResults,
      closeDialog,
    }
  },
}
</script>
