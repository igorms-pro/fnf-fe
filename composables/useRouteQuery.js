import { computed, nextTick, useRoute, useRouter } from '#imports'

export function useRouteQuery(name, defaultValue) {
  const route = useRoute()
  const router = useRouter()

  return computed({
    get() {
      const data = route.query[name]

      if (data == null) {
        return defaultValue ?? null
      }

      if (Array.isArray(data)) {
        return data.filter(Boolean)
      }

      return data
    },

    set(v) {
      nextTick(() => {
        router.replace({
          query: {
            ...route.query,
            [name]: v === defaultValue || v === null ? undefined : v,
          },
        })
      })
    },
  })
}
