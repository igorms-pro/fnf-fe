<template>
  <section class="relative overflow-hidden md:h-[870px]">
    <div
      class="lg:animate-vibrate-slowly inset-0 hidden h-full bg-contain bg-center bg-no-repeat md:absolute lg:block"
      :style="`background-image: url(${IconLaunchpad})`"
    ></div>
    <div
      class="container relative z-10 flex h-full w-full flex-col justify-between px-5 pt-5"
    >
      <div class="text-center">
        <h1
          class="mx-auto mt-11 mb-4 w-full text-center text-2xl font-extrabold md:text-5xl"
        >
          {{ $t('launchpad.title') }}
        </h1>
        <p class="font-base text-base">
          {{ $t('launchpad.text') }}
        </p>
      </div>
      <img
        class="mx-auto -my-10 scale-125 md:-my-36 lg:hidden"
        :src="IconLaunchpad"
        alt="Few and Far illustration"
      />
      <div
        class="relative mb-14 flex flex-row justify-center lg:mb-24 lg:space-x-5"
      >
        <nuxt-link
          to="https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform"
          class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg font-bold"
        >
          {{ $t('launchpad.button') }}
        </nuxt-link>
        <nuxt-link
          href="https://fewfar.com/creators"
          target="_blank"
          class="btn btn-border-b btn-base btn-center btn-lg border-2 border-b-4 font-bold"
        >
          {{ $t('minting.buttonLearn') }}
        </nuxt-link>
      </div>
    </div>
  </section>
  <section class="container mb-20">
    <div
      class="flex flex-col items-center justify-center space-y-5 text-black lg:flex-row lg:space-y-0 lg:space-x-5"
    >
      <div
        class="shadow-box animate-up-hover mx-auto flex h-36 w-full rounded-3xl border-b-2 border-grey-200 bg-green-light dark:border-black md:w-2/3 lg:mx-0 lg:h-48 lg:w-96"
      >
        <div
          class="flex w-full items-center justify-center px-5 lg:justify-between"
        >
          <img
            class="relative -left-5 mr-2 h-40 w-32 lg:-top-5 lg:mr-0 lg:h-auto lg:w-auto"
            :src="IconCreator"
            alt="Few and Far illustration"
          />
          <p
            class="flex-none px-10 text-center text-xl font-bold lg:flex lg:px-0 lg:text-left lg:text-3xl lg:font-extrabold"
            v-html="$t('launchpad.creator')"
          ></p>
        </div>
      </div>
      <div
        class="shadow-box animate-up-hover mx-auto flex h-36 w-full rounded-3xl border-b-2 border-grey-200 bg-pink-light dark:border-black md:w-2/3 lg:mx-0 lg:h-48 lg:w-96"
      >
        <div
          class="flex w-full items-center justify-center px-5 lg:justify-between"
        >
          <img
            class="h-35 relative mr-6 w-28 lg:-top-5 lg:h-auto lg:w-auto"
            :src="IconGrant"
            alt="Few and Far illustration"
          />
          <p
            class="flex-none px-10 text-center text-xl font-bold lg:flex lg:px-0 lg:text-left lg:text-3xl lg:font-extrabold"
            v-html="$t('launchpad.grant')"
          ></p>
        </div>
      </div>
      <div
        class="shadow-box animate-up-hover mx-auto flex h-36 w-full rounded-3xl border-b-2 border-grey-200 bg-blue-light dark:border-black md:w-2/3 lg:mx-0 lg:h-48 lg:w-96"
      >
        <div
          class="flex w-full items-center justify-center px-5 lg:justify-between"
        >
          <img
            class="relative mr-3 h-28 w-32 lg:-left-7 lg:mr-0 lg:h-auto lg:w-auto"
            :src="IconOutbound"
            alt="Few and Far illustration"
          />
          <p
            class="flex-none px-10 text-center text-xl font-bold lg:-ml-5 lg:flex lg:px-0 lg:text-left lg:text-3xl lg:font-extrabold"
            v-html="$t('launchpad.outbound')"
          ></p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import IconLaunchpad from '~/assets/images/launchpad/bg-launchpad.svg'
import IconCreator from '~/assets/images/launchpad/creator-rewards.svg'
import IconGrant from '~/assets/images/launchpad/grant-funding.svg'
import IconOutbound from '~/assets/images/launchpad/outbound.svg'
import { defineComponent } from '#imports'

export default defineComponent({
  setup() {
    return {
      IconLaunchpad,
      IconCreator,
      IconGrant,
      IconOutbound,
    }
  },
})
</script>
