<template>
  <section
    class="relative overflow-hidden pb-16 md:flex md:h-[650px] md:items-center md:pb-24"
  >
    <div class="absolute inset-0 w-full">
      <img
        src="~/assets/images/backgrounds/mask-radial-earn-home-page.svg"
        alt="mask-radial-header-home-page"
        class="float-right scale-105 transform"
      />
      <img
        src="~/assets/images/icons/fnf/earn-up.svg"
        alt="logo few and far"
        class="lg:animate-vibrate-slowly absolute right-0 bottom-0 hidden lg:block lg:w-3/5 xl:max-w-3xl"
      />
    </div>
    <div class="container">
      <div class="relative z-10">
        <div class="flex flex-col md:flex-row md:justify-between">
          <div class="">
            <p
              class="main-title"
              v-html="$t('home.earn.title', { apr: percentageAPY })"
            ></p>
            <div class="mt-5 w-2/3">
              <p
                class="text-sm dark:text-grey-light2 md:text-base md:leading-7"
              >
                {{ $t('home.earn.text') }}
              </p>
              <div class="mt-8 md:mt-12">
                <nuxt-link
                  :to="{ name: 'rewards' }"
                  class="btn btn-brand btn-border-b btn-base btn-center btn-base dark:btn-brand-dark inline-flex border-2 border-b-4 font-bold"
                >
                  <img
                    src="~/assets/images/icons/fnf/prism.svg"
                    alt="icon prism"
                    class="mr-2"
                  />
                  {{ $t('home.explore.action.earnRewards') }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div
            class="absolute top-0 -right-10 md:relative md:-top-20 md:-mb-24 md:flex md:max-h-100 md:justify-end"
          >
            <img
              src="~/assets/images/icons/fnf/earn-up.svg"
              alt="Few and Far logo"
              class="lg:animate-vibrate-slowly block h-48 object-cover sm:h-64 md:h-96 lg:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  setup() {
    const percentageAPY = ref(30)

    return {
      percentageAPY,
    }
  },
}
</script>
