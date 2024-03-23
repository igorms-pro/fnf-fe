<template>
  <section class="relative overflow-hidden md:h-[870px]">
    <div
      class="lg:animate-vibrate-slowly inset-0 hidden h-full bg-contain bg-center bg-no-repeat md:absolute lg:block"
      :style="`background-image: url(${IconMinting})`"
    ></div>
    <div
      class="container relative z-10 flex h-full w-full flex-col justify-between px-5 pt-5"
    >
      <div class="text-center">
        <h1
          class="mx-auto mt-11 mb-4 w-full text-center text-2xl font-extrabold md:text-5xl"
        >
          {{ $t('minting.title') }}
        </h1>
        <p class="font-base text-base">
          {{ $t('minting.text') }}
        </p>
      </div>
      <img
        class="mx-auto -my-10 scale-125 md:-my-36 lg:hidden"
        :src="IconMinting"
        alt="Few and Far illustration"
      />
      <div
        class="relative mb-14 flex flex-row justify-center lg:mb-24 lg:space-x-5"
      >
        <nuxt-link
          to="https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform"
          class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg font-bold"
        >
          {{ $t('minting.button') }}
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
</template>
<script>
import IconMinting from '~/assets/images/minting/bg-minting.svg'
import { defineComponent } from '#imports'

export default defineComponent({
  setup() {
    return {
      IconMinting,
    }
  },
})
</script>
