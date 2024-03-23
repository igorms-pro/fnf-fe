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
          <template v-if="loading">
            <UserProfileLoading />
          </template>
          <template v-if="!loading && activities.length > 0">
            <div>
              <template v-if="!lgAndLarger">
                <div
                  v-for="{
                    id,
                    img,
                    name,
                    txId,
                    type,
                    date,
                    amount,
                    buyer,
                    seller,
                    contractId,
                    imgSet,
                  } in activities"
                  :key="txId"
                  class="block"
                >
                  <ItemActivity
                    :id="id"
                    :img="img"
                    :tx-id="txId"
                    :name="name"
                    :amount="amount"
                    :buyer="buyer"
                    :seller="seller"
                    :date="date"
                    :type="type"
                    :contract-id="contractId"
                    :table-type="'collections'"
                    :img-set="imgSet"
                  >
                  </ItemActivity>
                </div>
              </template>
              <ItemActivityTable
                v-else
                :activities="activities"
                :table-type="'collections'"
              ></ItemActivityTable>
            </div>
          </template>
          <template v-if="!loading && activities.length === 0">
            <div class="mx-auto">
              <img
                src="~/assets/images/empty-fridge.svg"
                class="mx-auto"
                :alt="$t('profile.sections.activitiesEmpty')"
              />
              <p class="mt-5 text-center text-lg font-semibold">
                {{ $t('profile.sections.activitiesEmpty') }}
              </p>
            </div>
          </template>
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
import { defineComponent, onMounted, useBodyScroll, useRoute } from '#imports'
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
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const lgAndLarger = breakpoints.greater('lg')
    const { $useFetch, $fetch } = useNuxtApp()

    const currentPage = ref(1)
    const LIMIT = 15
    const activities = ref([])
    const route = useRoute()
    const loading = ref(true)

    const collectionAccountId = route.params.id

    const getCollectionActivities = async () => {
      const data = await $fetch(
        `/collection/${collectionAccountId}/activities?page=${currentPage.value}&limit=${LIMIT}`
      )

      if (data?.length > 0) {
        if (data?.length > 0) {
          data
            .filter(
              (item) =>
                item.contract_action !== 'MINT' &&
                item.contract_action !== 'BURN' &&
                item.contract_action !== 'cancel_offer' &&
                item.contract_action !== 'storage_deposit'
            )
            .forEach((activityItem) => {
              const { media256, media512, media1024 } =
                activityItem.metadata ?? {}
              // sale that occurs outside our platform
              if (
                activityItem.contract_action !== 'TRANSFER' &&
                activityItem.price !== '-1'
              ) {
                activities.value.push({
                  id: activityItem.token_id,
                  contractId: collectionAccountId,
                  name: activityItem.metadata.title ?? '',
                  img: activityItem.metadata.media ?? '',
                  date: activityItem.block_timestamp,
                  txId: activityItem.transaction_hash ?? '',
                  type:
                    activityItem.contract_action === 'TRANSFER'
                      ? 'resolve_purchase'
                      : activityItem.contract_action,
                  amount: activityItem.price ?? '',
                  buyer:
                    activityItem.contract_action === 'offer'
                      ? activityItem.signer_account_id
                      : activityItem.new_owner,
                  seller:
                    activityItem.contract_action === 'offer'
                      ? ''
                      : activityItem.signer_account_id,
                  imgSet: utils.createImageSet({
                    256: media256,
                    512: media512,
                    1024: media1024,
                  }),
                })
              }
            })
        }
      }
      loading.value = false
    }

    // TODO - REFACTO!! WAS BUILT ONLY FOR ITEMS SECTION...
    const routeQueryIsOnSale = useRouteQuery('isOnSale')
    const { getSalesForCollection } = useContractMarket()
    const { y } = useWindowScroll()
    const routeQueryAttributes = useRouteQuery('attributes')
    const routeQuerySort = useRouteQuery('sort')
    const routeQuerySearch = useRouteQuery('search')
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
      ]
      return queries.join('')
    }

    const getEndpoint = () => {
      if (!routeQuerySearch.value && currentPage.value > 2) {
        currentPage.value = 1
      }
      const apiEndpoint = routeQuerySearch.value
        ? `/nft/${props.collectionAccountId}/search?search=${routeQuerySearch.value}&page=${currentPage.value}&limit=${LIMIT}${url.value}`
        : `/nft?contractId=${props.collectionAccountId}${url.value}&page=${currentPage.value}&limit=${LIMIT}`
      return apiEndpoint
    }
    url.value = getAllQueries()

    const { data, refresh, pending } = $useFetch(() => getEndpoint())
    // TODO: fix bug that doesn't refresh automatically when changing collectionAccountId...
    refresh()
    watch(routeQuerySort, () => {
      url.value = getAllQueries()
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

    const isLgSize = breakpoints.greater('lg')
    const isFilterSidePanelOpen = ref(true)
    const LAYOUT_GRID_4x4 = '4x4'
    const LAYOUT_GRID_8x8 = '8x8'
    const layoutGrid = ref(LAYOUT_GRID_4x4)

    onMounted(() => {
      if (!isLgSize.value) {
        isFilterSidePanelOpen.value = false
      }
      getCollectionActivities()
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

    const forSale = await getSalesForCollection(
      props?.collectionAccountId,
      0,
      100
    )

    const toDisplay = (item) => {
      if (!buyNow.value && item) return true
      else if (buyNow && item) {
        const isForSale = forSale.find((i) => i.token_id === item.tokenSeriesId)
        if (isForSale) return true
      }
      return false
    }

    const getPrice = (item) => {
      const isForSale = forSale.find((i) => i.token_id === item.tokenSeriesId)
      return isForSale?.sale_conditions?.near ?? String(0)
    }
    return {
      activities,
      lgAndLarger,
      loading,

      items,
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
      toDisplay,
      getPrice,
    }
  },
})
</script>
