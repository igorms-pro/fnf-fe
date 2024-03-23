import { defineStore } from 'pinia'
import { useAsyncData, useNuxtApp } from '#imports'

export const useCollections = defineStore('collections', {
  state: () => {
    return {
      collectionExplorerId: null,
    }
  },

  actions: {
    async fetchCollectionExplorerId() {
      const { $fetch } = useNuxtApp()

      const randomCollection = await $fetch(`/collection/random`)
      this.collectionExplorerId = randomCollection[0]?.collectionId
      return this.collectionExplorerId
    },
  },
})
