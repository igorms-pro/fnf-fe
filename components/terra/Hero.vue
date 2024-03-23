<template>
  <div class="overflow-hidden">
    <div class="container w-full px-5 pt-5">
      <div class="text-center">
        <div
          class="mx-auto mb-5 inline-block rounded-lg bg-purple/40 py-2.5 px-5 lg:mt-12"
        >
          <img :src="IconBuiltOnNear" alt="built on near" />
        </div>

        <img
          :src="IconWelcomeToFnf"
          alt="welcome FNF"
          class="mx-auto mb-5 w-[322px] text-white lg:w-[712px]"
        />
      </div>
      <div class="relative">
        <img
          class="lg:animate-vibrate-slowly relative top-2 mx-auto scale-125 lg:h-[457px] lg:transform-none"
          :src="IconHouse"
          alt="Few and Far illustration"
        />

        <h1 class="mx-auto mt-14 mb-5 w-full text-center text-lg font-bold">
          {{ $t('welcomeTerraLuna.heroTitle') }}
        </h1>
        <div
          class="relative z-50 flex flex-col justify-center space-y-2.5 lg:mt-10 lg:flex-row lg:space-y-0 lg:space-x-5"
        >
          <nuxt-link
            to="https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform"
            class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg font-bold"
          >
            {{ $t('welcomeTerraLuna.btnListing') }}
          </nuxt-link>
          <nuxt-link
            to="https://discord.gg/mWYuDzfTPJ"
            class="btn btn-brand btn-border-b btn-base btn-center btn-lg border-2 border-b-4 font-bold"
          >
            {{ $t('common.action.btnCommunity') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconHouse from '~/assets/images/backgrounds/house-claim-empty-airdrop.png'
import IconBuiltOnNear from '~/assets/images/terra-luna/built-on-near.svg'
import IconWelcomeToFnf from '~/assets/images/terra-luna/welcome-to-fnf.svg'

export default {
  setup() {
    return {
      IconHouse,
      IconWelcomeToFnf,
      IconBuiltOnNear,
    }
  },
}
</script>
