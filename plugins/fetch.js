/* global $fetch */

import { defineNuxtPlugin, useFetch, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(async () => {
  const { API_BASE: baseURL } = useRuntimeConfig()

  return {
    provide: {
      fetch(path, opts) {
        return $fetch(path, {
          baseURL,
          ...(opts && { ...opts }),
        })
      },

      useFetch(path, opts) {
        return useFetch(path, {
          baseURL,
          ...(opts && { ...opts }),
        })
      },
    },
  }
})
