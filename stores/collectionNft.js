import { defineStore } from 'pinia'
import { useNuxtApp, useRouter } from '#imports'

export const useCollectionItems = defineStore('collectionItem', {
  state: () => {
    return {
      collectionId: '',
      collectionItem: [],
      attributeFilter: [],
      filters: [],
      attributes: '',
      sort: '',
      timeOut: null,
    }
  },

  getters: {},

  actions: {
    async fetchFiltersCollectionItems(collectionAccoundId) {
      const { $useFetch } = useNuxtApp()
      const { data: list } = await $useFetch(
        `/collection/${collectionAccoundId}`
      )
      this.attributeFilter = list.value.attributes
    },

    async fetchCollectionItems(collectionAccoundId, isRefresh) {
      const { $useFetch } = useNuxtApp()
      const { data: items, refresh } = await $useFetch(
        `/nft?${collectionAccoundId}&contractId=${collectionAccoundId}${this.attributes}${this.sort}`
      )
      this.collectionItem = items.value?.docs
      if (isRefresh) {
        refresh()
      }
    },

    refreshCollection() {
      this.fetchCollectionItems(this.collectionId, true)
    },

    timeout() {
      clearTimeout(this.timeOut)
      this.timeOut = setTimeout(() => {
        this.refreshCollection()
      }, 2000)
    },

    createFilterList() {
      const router = useRouter()
      const routeQuery = router.currentRoute.value
      if (routeQuery.query) {
        this.convertRouterQuery(routeQuery.query)
      }
    },

    convertRouterQuery(routeQuery) {
      const data = []
      for (const traitType in routeQuery) {
        if (routeQuery[traitType]) {
          const element = routeQuery[traitType].split(',')
          if (element.length > 1) {
            element.map((i) => data.push({ attr: traitType, val: i }))
          } else {
            data.push({ attr: traitType, val: element[0] })
          }
        }
      }
      this.filters = data
      this.convertRouterQueryToString(routeQuery)
    },

    convertRouterQueryToString(routeQuery) {
      const isNotEmpty = Object.keys(routeQuery).length > 0
      let url = '&attributes='
      if (isNotEmpty) {
        for (const traitType in routeQuery) {
          if (routeQuery[traitType]) {
            url += `${traitType}:${routeQuery[traitType]},`
          }
        }
      }
      this.attributes = isNotEmpty ? url.slice(0, -1) : ''
    },

    ifAttributeExist(attribute) {
      const router = useRouter()
      const routeQuery = router.currentRoute.value
      if (
        routeQuery.query[attribute] &&
        router.currentRoute.value.query[attribute] !== ''
      ) {
        return true
      }
      return false
    },

    ifValueAttributeExist(attribute, value) {
      const router = useRouter()
      const queryValues = router.currentRoute.value.query[attribute].split(',')
      return queryValues.includes(value)
    },

    routerPushQuery(attribute, value) {
      const router = useRouter()
      const newQuery = {
        ...router.currentRoute.value.query,
        [attribute]: value,
      }
      router.push({ query: newQuery })
      this.timeout()
      this.convertRouterQuery(newQuery)
    },

    routerDeleteQuery(attribute) {
      const router = useRouter()
      const newQuery = { ...router.currentRoute.value.query }
      delete newQuery[attribute]
      router.push({
        query: newQuery,
      })
      this.timeout()
      this.convertRouterQuery(newQuery)
    },

    sortByPriceOrDate(sortSelected) {
      switch (sortSelected.id) {
        case 1:
          // TODO sort date recently
          break
        case 2:
          this.sort = '&sort=-price'
          break
        case 3:
          this.sort = '&sort=+price'
          break
      }
      this.refreshCollection()
    },
  },
})
