<template>
  <div class="relative text-center lg:py-28 lg:text-left">
    <h2 class="text-3xl font-extrabold lg:mb-10 lg:w-100 lg:text-5xl">
      {{ $t('welcomeTerraLuna.creatorTitle') }}
    </h2>
    <img
      src="~/assets/images/terra-luna/terra-creator.png"
      alt="background image"
      class="mt-12 mb-20 -ml-12 scale-150 lg:absolute lg:-right-32 lg:-top-44 lg:m-0 lg:scale-100"
    />
    <p
      class="mb-8 text-base lg:w-100"
      v-html="$t('welcomeTerraLuna.creatorDescription')"
    ></p>
    <nuxt-link
      to="https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform"
      class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg block w-full font-bold lg:w-fit"
    >
      {{ $t('welcomeTerraLuna.btnTerraBridge') }}
    </nuxt-link>
  </div>
</template>
