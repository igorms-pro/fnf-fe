<template>
  <div class="relative z-50 bg-white text-black shadow-md">
    <div class="px-5 sm:px-6 lg:px-8">
      <div class="flex h-20 w-full items-center justify-between">
        <nuxt-link
          :to="{ name: 'index' }"
          class="group flex w-fit items-center"
        >
          <img
            class="block h-7 w-auto duration-100 ease-linear group-hover:rotate-90 lg:h-8"
            src="~/assets/images/icons/fnf/logo.svg?url"
            alt="Few and Far"
          />
          <FnFLogo class="ml-2 block h-4 w-auto text-black lg:h-5"></FnFLogo>
        </nuxt-link>

        <div class="justify-self-end">
          <div class="-ml-1.5 flex items-center space-x-1.5 lg:space-x-2.5">
            <!-- <button
              class="btn-base btn-white shadow-box btn-center btn btn-border-purple flex rounded-lg border-2 px-2.5 font-semibold lg:px-0"
            >
              <NavbarDropDownLang></NavbarDropDownLang>
            </button> -->
            <nuxt-link
              to="https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform"
              class="btn btn-primary btn-border-primary btn-base flex border-2 py-2.5 px-4 font-semibold"
            >
              <span class="hidden lg:block">
                {{ $t('welcomeTerraLuna.navBarButton') }}
              </span>
              <span class="block lg:hidden">
                {{ $t('welcomeTerraLuna.navBarButtonShort') }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '#imports'

import FnFLogo from '~/assets/images/icons/fnf/fnf.svg?component'

export default defineComponent({
  components: {
    FnFLogo,
  },

  setup() {
    return {}
  },
})
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply text-purple;
}
</style>
