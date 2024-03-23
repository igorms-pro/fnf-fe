<template>
  <section class="container relative z-10 mt-11 mb-14 md:mb-32 md:mt-20">
    <hr
      class="my-14 border-grey-light group-hover:border-transparent dark:border-grey-300 md:my-16"
    />
    <div class="text-center">
      <h3 class="mb-3 text-base font-bold md:text-2xl">
        {{ $t('claim.member.title') }}
      </h3>
      <p class="text-base text-grey-300 dark:text-grey-light2">
        {{ $t('claim.member.text') }}
      </p>
      <div
        class="mt-8 flex flex-col space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-3"
      >
        <nuxt-link
          href="https://app.ref.finance"
          target="_blank"
          class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl w-full font-bold md:w-auto"
        >
          {{ $t('claim.member.btnBuy') }}
        </nuxt-link>

        <nuxt-link
          href="https://docs.fewfar.com/"
          target="_blank"
          class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl w-full font-bold md:w-auto"
        >
          {{ $t('claim.member.btnLearn') }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
