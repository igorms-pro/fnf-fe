<template>
  <div
    :class="[
      card.colorCls,
      'shadow-box animate-up-hover flex h-56 flex-col justify-end rounded-3xl border-b-2 border-grey-200 pb-6 dark:border-black md:h-56 md:w-44 md:pb-10 xl:h-80 xl:w-64',
    ]"
  >
    <nuxt-link
      :to="!doOpenModal ? nuxtLinkTo : null"
      @click="doOpenModal && openConnectModal('/user-profile')"
    >
      <img :src="card.icon" class="relative h-44 w-full md:h-36 xl:h-60" />
      <p
        class="pt-2.5 text-center text-lg font-bold dark:text-white md:pt-3 md:text-xl xl:pt-6 xl:text-2xl"
      >
        {{ card.label }}
      </p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const {
      $near: { isSignedIn },
    } = useNuxtApp()

    const { openDialog: openConnectModal } = useConnectDialogState()

    return {
      doOpenModal: computed(
        () => !isSignedIn.value && props.card.routeName === 'user-profile'
      ),

      nuxtLinkTo: computed(() => ({
        name: props.card.routeName ?? 'index',
        params: props.card.routeParams ?? {},
      })),

      openConnectModal,
    }
  },
}
</script>
