<template>
  <section v-if="collections" class="container">
    <header class="items-center pt-5 pb-16 lg:px-20 lg:pt-16 lg:pb-16">
      <div
        :class="[
          isInputFocus
            ? 'border-purple'
            : 'border-transparent hover:border-purple dark:border-grey-300 dark:hover:border-purple',
          'shadow-box group relative mx-auto mb-9 flex h-12 w-full justify-between rounded-lg border md:mb-16 md:h-14 md:w-[500px]',
        ]"
      >
        <div class="dark-mode flex rounded-l-lg bg-white">
          <button class="mx-3 flex items-center justify-center" type="button">
            <IconSearch />
          </button>
        </div>
        <input
          v-model="searchInput"
          :placeholder="$t('search.title')"
          class="dark-mode block h-full w-full rounded-r-lg border-none py-2 pr-2 focus:outline-none"
          @focus="isInputFocus = true"
          @blur="isInputFocus = false"
          @click.prevent="setSearchModalOpen(true)"
        />
        <div v-if="searchInput" class="dark-mode flex rounded-r-lg bg-white">
          <button
            class="mx-3 flex items-center justify-center hover:text-purple"
            type="button"
            @click="clearSearchInput"
          >
            <IconClose />
          </button>
        </div>
      </div>
      <div class="lg:flex lg:justify-between">
        <h1 class="title text-center lg:text-left">
          {{ $t('home.collections.popular') }}
        </h1>
        <BaseRadioGroup
          v-model:value="radioSelected"
          class="mx-auto mt-10 lg:mx-0 lg:mt-0"
          :items="multipleData"
          name="collection"
        ></BaseRadioGroup>
      </div>
    </header>
    <div
      class="mb-16 space-y-10 sm:grid sm:grid-cols-2 sm:gap-8 sm:space-y-0 md:grid-cols-3 lg:grid-cols-4"
    >
      <template v-if="pending">
        <LoaderSkeletonCollectionCard v-for="i in 12" :key="i" />
      </template>
      <template v-else>
        <CollectionCard
          v-for="{
            _id,
            collectionName: name,
            collectionId: accountId,
            media,
            icon,
            description,
            isVerified,
            media256,
            media512,
            media1024,
          } in collections"
          :id="_id"
          :key="_id"
          :name="name"
          :desc="description"
          :account-id="accountId"
          :img="media || icon || ''"
          :is-verified="isVerified"
          :img-set="
            createImageSet({ 256: media256, 512: media512, 1024: media1024 })
          "
        ></CollectionCard>
      </template>
    </div>

    <!-- Decide how to handle this -->
    <!-- <p class="mb-16">
      <button
        class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-border-b btn-center btn-lg mx-auto font-bold md:w-72"
        @click="loadMore"
      >
        {{ $t('common.action.loadMore') }}
      </button>
    </p> -->
  </section>
</template>

<script>
import i18n from 'i18next'
import { useDebounceFn } from '@vueuse/core'
import { defineComponent } from '#imports'
import utils from '~/utils'

import IconSearch from '~/assets/images/icons/search-icon.svg?component'
import IconClose from '~/assets/images/icons/close.svg?component'

export default defineComponent({
  components: {
    IconSearch,
    IconClose,
  },

  setup() {
    const { $useFetch } = useNuxtApp()
    const { setShowDialog: setSearchModalOpen } = useSearchDialogState()
    const searchInput = ref('')
    const searchValue = ref('')
    const isInputFocus = ref(false)
    const TIMEOUT = 1000

    const radioSelected = ref('1d')
    const multipleData = [
      {
        label: i18n.t('timeDuration.hours', { number: 24 }),
        value: '1d',
      },
      {
        label: i18n.t('timeDuration.days', { number: 7 }),
        value: '7d',
      },
      {
        label: i18n.t('timeDuration.days', { number: 30 }),
        value: '30d',
      },
    ]

    const ITEM_NUMBER = 1
    const displayLimit = ref(ITEM_NUMBER)
    const collections = ref([])
    const PAGE_LIMIT = 1000

    const url = computed(
      () =>
        `/collection/popular/?duration=${radioSelected.value}&search=${searchValue.value}&page=${displayLimit.value}&limit=${PAGE_LIMIT}&isVerified=true`
    )

    const { data, refresh, pending } = $useFetch(() => url.value)

    watch(radioSelected, () => {
      collections.value = []
      displayLimit.value = 1
      refresh()
    })

    watch(data, () => {
      if (data.value) {
        collections.value.push(...data.value.splice(0, PAGE_LIMIT))
      }
    })
    watch(displayLimit, (oldVal) => {
      collections.value.push(...data.value.splice(oldVal, ITEM_NUMBER))
    })

    const loadMore = () => {
      displayLimit.value += ITEM_NUMBER
    }

    const performSearch = useDebounceFn(() => {
      searchValue.value = searchInput.value
    }, TIMEOUT)

    watch(searchInput, performSearch)

    const clearSearchInput = () => {
      searchInput.value = ''
    }

    onMounted(() => {
      refresh()
    })

    return {
      searchInput,
      isInputFocus,
      clearSearchInput,
      collections,
      pending,

      multipleData,
      radioSelected,

      displayLimit,
      loadMore,
      createImageSet: utils.createImageSet,
      setSearchModalOpen,
    }
  },
})
</script>
