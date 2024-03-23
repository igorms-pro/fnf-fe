// https://router.vuejs.org/api/#routeroptions
export default {
  scrollBehavior(to, from, savedPosition) {
    const noScrollToTopRoutes = ['user-profile', 'collection-id']

    if (savedPosition) {
      return savedPosition
    }

    for (const routeName of noScrollToTopRoutes) {
      if (
        to.name?.search(routeName) > -1 &&
        from.name?.search(routeName) > -1
      ) {
        return null
      }
    }

    return {
      top: 0,
    }
  },
}
