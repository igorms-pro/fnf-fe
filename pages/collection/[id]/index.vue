<template>
  <section>
    <div class="flex min-h-screen md:relative">
      <CollectionSidebarFilters
        :is-filter-side-panel-open="isFilterSidePanelOpen"
        :attributes="collection.attributes"
        @filter-side-panel-toggle="toggleSidebar"
      >
        <template #buyNowToggle>
          <Switch
            v-model="buyNow"
            :class="buyNow ? 'bg-purple' : 'bg-grey-light3 dark:bg-black/40'"
            class="relative inline-flex h-7 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span
              aria-hidden="true"
              :class="buyNow ? 'translate-x-5' : 'translate-x-0.5'"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"
            />
          </Switch>
        </template>
      </CollectionSidebarFilters>
      <CollectionLayout :is-filter-side-panel-open="isFilterSidePanelOpen">
        <template #toolbar>
          <CollectionTopbarFilter
            :is-filter-side-panel-open="isFilterSidePanelOpen"
            :layout-grid="layoutGrid"
            :pending="pending"
            @refresh-url="refresh"
            @filter-side-panel-toggle="toggleSidebar"
            @layout-grid="layoutGrid = $event"
          ></CollectionTopbarFilter
        ></template>
        <template #layout>
          <div
            v-if="
              items?.length === 0 &&
              (routeQueryAttributes || routeQuerySearch || buyNow)
            "
            class="col-span-4 md:my-40"
          >
            <img
              src="~/assets/images/empty-fridge.svg"
              :alt="$t('common.noItems')"
              class="mx-auto"
            />
            <p class="mt-5 text-center text-lg font-semibold">
              {{ $t('common.noItems') }}
            </p>
          </div>
          <TransitionGroup
            name="fade-up"
            tag="div"
            :class="[
              layoutGrid === LAYOUT_GRID_4x4
                ? 'lg:grid-cols-4'
                : 'md:grid-cols-4 lg:grid-cols-6',
              'mb-28 grid grid-cols-2 gap-4 sm:grid-cols-3',
            ]"
          >
            <template v-for="item in items" :key="item._id">
              <div
                class="col-span-1 pt-1.5 transition-all duration-300 ease-linear"
              >
                <ItemCard
                  :id="item._id"
                  :name="item.metadata.title"
                  :media="item.metadata.media || item.metadata.icon"
                  :contract-id="item.contractId"
                  :token-series-id="item.tokenSeriesId"
                  :is-verified="isVerified"
                  :price="getPrice(item)"
                  class="animate-up-hover"
                  :img-set="
                    createImageSet({
                      256: item.metadata.media256,
                      512: item.metadata.media512,
                      1024: item.metadata.media1024,
                    })
                  "
                >
                  <template #actionButton>{{}}</template>
                </ItemCard>
              </div>
            </template>
            <template v-if="pending">
              <LoaderSkeletonItemCard
                v-for="i in 16"
                :key="i"
                class="col-span-1 transition-all duration-300 ease-linear"
              ></LoaderSkeletonItemCard>
            </template>
          </TransitionGroup>
          <div v-if="hasNextPage" class="mb-10 text-center">
            {{ $t('collection.loading') }}
          </div>
        </template>
      </CollectionLayout>
    </div>
  </section>
</template>
<script>
import {
  breakpointsTailwind,
  useBreakpoints,
  useDebounceFn,
  useWindowScroll,
} from '@vueuse/core'
import { Switch } from '@headlessui/vue'
import { onBeforeRouteLeave } from 'vue-router'
import { defineComponent, onMounted, useBodyScroll } from '#imports'
import utils from '~/utils'

export default defineComponent({
  components: {
    Switch,
  },
  props: {
    collection: {
      type: Object,
      required: true,
    },
    collectionAccountId: {
      type: String,
      required: true,
    },
  },

  async setup(props) {
    const { $useFetch } = useNuxtApp()
    const { attributes: selectedAttributes, changeAttribute } =
      useCollectionAttributes()
    const routeQueryIsOnSale = useRouteQuery('isOnSale')
    const { y } = useWindowScroll()
    const routeQueryAttributes = useRouteQuery('attributes')
    const routeQuerySort = useRouteQuery('sort')
    const routeQuerySearch = useRouteQuery('search')
    const currentPage = ref(1)
    const LIMIT = 20
    const DISTANCE_SCROLL_BOTTOM = 280
    const pushItems = ref(false)
    const url = ref('')
    const buyNow = ref(
      routeQueryIsOnSale.value === 'true' ? true : false || false
    )
    const TIMEOUT = 500

    const items = ref([])

    const updateRouteQuery = useDebounceFn(() => {
      routeQueryIsOnSale.value = buyNow.value ? 'true' : ''
    }, TIMEOUT)

    const isEmpty = (query, attribute) => {
      return attribute ? `${query}${encodeURIComponent(attribute)}` : ''
    }
    const getAllQueries = () => {
      currentPage.value = 1
      const queries = [
        isEmpty('&isOnSale=', routeQueryIsOnSale.value),
        isEmpty('&sort=', routeQuerySort.value),
        isEmpty('&attributes=', routeQueryAttributes.value),
        isEmpty('&search=', routeQuerySearch.value),
      ]
      return queries.join('')
    }

    const getEndpoint = () =>
      url.value.includes('search') // use a different URL if we are searching
        ? `/nft/${props.collectionAccountId}/search?${url.value}&page=${currentPage.value}&limit=${LIMIT}`
        : `/nft?contractId=${props.collectionAccountId}${url.value}&page=${currentPage.value}&limit=${LIMIT}`

    url.value = getAllQueries()

    const { data, refresh, pending } = $useFetch(() => getEndpoint())
    // TODO: fix bug that doesn't refresh automatically when changing collectionAccountId...
    refresh()
    watch(routeQuerySort, () => {
      url.value = getAllQueries()
      if (url.value.includes('price')) buyNow.value = true // if the applied filter is a price sort, set buyNow toggle on
      refresh()
    })
    watch(routeQueryAttributes, () => {
      url.value = getAllQueries()
      refresh()
    })
    watch(routeQuerySearch, () => {
      items.value = false
      url.value = getAllQueries()
      refresh()
    })
    watch(routeQueryIsOnSale, () => {
      items.value = false
      url.value = getAllQueries()
      refresh()
    })

    watch(buyNow, updateRouteQuery)

    watch(data, () => {
      if (data.value?.docs?.length > 0) {
        if (pushItems.value) {
          items.value.push(...data.value?.docs)
          pushItems.value = false
        } else {
          items.value = data.value?.docs
        }
      } else if (data.value.length > 0) {
        if (pushItems.value) {
          items.value.push(...data.value)
          pushItems.value = false
        } else {
          items.value = data.value
        }
      } else {
        items.value = []
      }
    })

    const hasNextPage = computed(() => data.value?.hasNextPage)

    const { bodyScroll } = useBodyScroll()

    watch(y, () => {
      if (
        y.value + window.innerHeight + DISTANCE_SCROLL_BOTTOM >=
          document.documentElement.offsetHeight &&
        !pending.value &&
        hasNextPage.value
      ) {
        currentPage.value++
        pushItems.value = true
      }
    })

    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isLgSize = breakpoints.greater('lg')
    const isFilterSidePanelOpen = ref(true)
    const LAYOUT_GRID_4x4 = '4x4'
    const LAYOUT_GRID_8x8 = '8x8'
    const layoutGrid = ref(LAYOUT_GRID_4x4)

    const fetchStoredAttributes = async () => {
      await refresh()
      const data = JSON.parse(localStorage.getItem('selectedAttributes'))
      if (data) {
        const attributes = Object.keys(data)
        attributes.forEach((attribute) => {
          const values = data[attribute]
          values.forEach((value) => {
            if (!selectedAttributes.value?.[attribute]?.includes(value))
              changeAttribute(attribute, value, true)
          })
        })
      }
    }

    onMounted(() => {
      if (!isLgSize.value) {
        isFilterSidePanelOpen.value = false
      }
      fetchStoredAttributes()
    })

    onBeforeRouteLeave((to, from) => {
      if (
        Object.keys(selectedAttributes.value).length &&
        to.name === 'collection-id-activities' &&
        from.name === 'collection-id'
      ) {
        localStorage.setItem(
          'selectedAttributes',
          JSON.stringify(selectedAttributes.value)
        )
      } else {
        localStorage.removeItem('selectedAttributes')
      }
    })

    watch(
      () => isLgSize.value,
      (newValue) => {
        if (!newValue) {
          isFilterSidePanelOpen.value = false
        } else {
          isFilterSidePanelOpen.value = true
        }
      }
    )

    const toggleSidebar = (toggle) => {
      isFilterSidePanelOpen.value = toggle
      if (!isLgSize.value) {
        bodyScroll(toggle)
      }
    }

    const getPrice = (item) => {
      if (!item?.isOnSale) return null
      else return item?.price.$numberDecimal ?? '0'
    }

    return {
      items,
      isVerified: props.collection.isVerified,
      pending,
      refresh,
      hasNextPage,
      routeQueryAttributes,
      routeQuerySearch,

      isLgSize,
      layoutGrid,
      LAYOUT_GRID_4x4,
      LAYOUT_GRID_8x8,
      bodyScroll,
      toggleSidebar,
      isFilterSidePanelOpen,
      buyNow,
      createImageSet: utils.createImageSet,
      getPrice,
    }
  },
})
</script>
