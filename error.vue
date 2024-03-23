<template>
  <section class="dark-mode">
    <div
      class="container flex min-h-screen items-center justify-center text-center md:text-left"
    >
      <div class="flex w-100 flex-col items-center justify-center text-center">
        <img
          src="~/assets/images/empty_island.svg"
          alt=""
          class="mb-2 block w-72"
        />
        <h1
          class="block w-full text-7xl font-bold text-grey-300 dark:text-grey-light"
        >
          {{ newError.statusCode }}
        </h1>
        <p class="mb-8 mt-6 block text-base text-grey-300 dark:text-grey-light">
          Sorry fren! Looks like you've sailed to a lost island.
        </p>
        <button
          class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-border-b btn-center btn-lg block w-full font-bold md:w-72"
          @click="handleError"
        >
          <!-- TODO: Problem with trad -->
          <!-- {{ $t('errorPage.btnBack') }} -->
          Back to home
        </button>
      </div>
    </div>
  </section>
</template>
<script>
definePageMeta({
  layout: 'error',
})

export default {
  props: {
    error: Object,
  },
  setup(props) {
    const newError = computed(() => {
      if (!props.error.error) {
        const splitMessage = props.error.message.split(':')
        return {
          ...props.error,
          error: splitMessage[0],
          message: splitMessage[1],
        }
      }
      return props.error
    })
    const handleError = () => {
      clearError({ redirect: '/' })
    }

    return { newError, handleError }
  },
}
</script>
