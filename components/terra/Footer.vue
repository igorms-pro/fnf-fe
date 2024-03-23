<template>
  <footer
    class="bg-grey-100 px-6 py-9 text-grey-300 lg:px-16 lg:pt-16 lg:pb-12"
  >
    <div class="mb-6 block">
      <nuxt-link to="/" class="group flex items-center justify-center">
        <img
          class="block h-8 w-auto duration-100 ease-linear group-hover:rotate-90"
          src="~/assets/images/icons/fnf/logo.svg"
          alt="Few and Far"
        />
        <IconFnF class="ml-2 block h-5 w-auto text-black"></IconFnF>
      </nuxt-link>
    </div>

    <div class="mb-8 mt-6 lg:m-0">
      <div class="flex justify-center">
        <div class="-ml-2 inline-block space-x-2">
          <div class="flex space-x-2.5">
            <nuxt-link
              v-for="{ link, title, icon } in socialLinks"
              :key="link"
              :href="link"
              :alt="title"
              target="_blank"
              class="btn-rounded btn-icon-lg shadow-box btn-primary btn-border-b-rounded btn-border-primary-dark border-b-4"
            >
              <component :is="icon"></component>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-11 flex w-fit justify-between">
      <p
        class="w-fit text-center text-xs lg:mt-4"
        v-html="$t('footer.copyright', { date: new Date().getFullYear() })"
      ></p>
      <!--  <button
        class="btn-base btn-white shadow-box btn-center btn btn-border-purple ml-3 hidden border-2 px-2.5 font-semibold lg:flex lg:px-0"
      >
        <NavbarDropDownLang :menu-position-top="true"></NavbarDropDownLang>
      </button> -->
    </div>
  </footer>
</template>

<script>
import IconFnF from '~/assets/images/icons/fnf/fnf.svg?component'
import IconDiscord from '~/assets/images/icons/socials/discord.svg?component'
import IconTwitter from '~/assets/images/icons/socials/twitter.svg?component'
import IconInstagram from '~/assets/images/icons/socials/instagram.svg?component'

export default {
  components: {
    IconFnF,
    IconDiscord,
    IconTwitter,
    IconInstagram,
  },

  setup() {
    return {
      socialLinks: [
        {
          title: 'Discord',
          link: 'https://discord.fewfar.com/',
          icon: IconDiscord,
        },
        {
          title: 'Twitter',
          link: 'https://twitter.com/FewandFarNFT',
          icon: IconTwitter,
        },
        {
          title: 'Instagram',
          link: 'https://www.instagram.com/accounts/login/?next=/fewandfarnft/',
          icon: IconInstagram,
        },
      ],
    }
  },
}
</script>
