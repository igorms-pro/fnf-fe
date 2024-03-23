<template>
  <footer
    class="dark-mode-duration bg-grey-100 px-6 py-9 text-grey-300 dark:bg-darkSecondary dark:text-grey-light2 md:grid md:grid-cols-5 md:px-16 md:pt-16 md:pb-12 lg:grid-cols-6"
  >
    <div class="mb-6 block md:col-span-2 md:row-start-1">
      <nuxt-link to="/" class="group flex w-fit items-center">
        <img
          class="block h-8 w-auto duration-100 ease-linear group-hover:rotate-90"
          src="~/assets/images/icons/fnf/logo.svg"
          alt="Few and Far"
        />
        <IconFnF
          class="ml-2 block h-5 w-auto text-black dark:text-white"
        ></IconFnF>
        <div
          class="ml-2 block rounded-lg bg-purple-light py-1.5 px-2 text-xs font-bold uppercase text-black dark:bg-purple dark:text-white"
        >
          Beta
        </div>
      </nuxt-link>
    </div>
    <div class="md:col-span-2 md:col-start-3 lg:col-start-4">
      <div class="grid grid-cols-3 gap-x-4">
        <div>
          <template
            v-for="{ title, link, routeName, routeParams } in footerLinks"
          >
            <nuxt-link
              v-if="routeName"
              :key="routeName"
              :to="{ name: routeName, params: routeParams ?? null }"
              class="block cursor-pointer text-sm font-semibold leading-8 hover:underline"
            >
              {{ title }}
            </nuxt-link>
            <nuxt-link
              v-else
              :key="link"
              class="block text-sm font-semibold leading-8 hover:underline"
              :to="link"
              :target="title === $t('launchpad.link') ? '_self' : '_blank'"
            >
              {{ title }}
            </nuxt-link>
          </template>
        </div>
        <div>
          <nuxt-link
            v-for="({ title, link, routeName }, i) in footerLinks2"
            :key="i"
            class="block text-sm font-semibold leading-8 hover:underline"
            :to="link !== '#' ? link : { name: routeName }"
            :target="link === '#' ? '' : '_blank'"
          >
            {{ title }}
          </nuxt-link>
        </div>
        <div>
          <nuxt-link
            v-for="({ title, link, routeName }, i) in footerLinks3"
            :key="i"
            class="block text-sm font-semibold leading-8 hover:underline"
            :to="link !== '#' ? link : { name: routeName }"
            :target="link.includes('https://fewfar.io') ? '_self' : '_blank'"
          >
            {{ title }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="mb-8 mt-6 md:col-start-5 md:row-start-1 md:m-0 lg:col-start-6">
      <div class="flex justify-between md:justify-end">
        <div class="-ml-2 inline-block space-x-2">
          <p class="mb-3 ml-2 hidden text-sm font-semibold md:block">
            {{ $t('footer.connect') }}
          </p>
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
        <!-- TODO: Maybe delete this button if not needed. -->
        <div class="hidden justify-end">
          <button
            class="btn-base btn-white shadow-box btn-center btn btn-border-purple border-2 px-2.5 font-semibold lg:px-0"
          >
            <NavbarDropDownLang :menu-position-top="true"></NavbarDropDownLang>
          </button>
        </div>
      </div>
    </div>
    <p
      class="text-xs md:col-span-4 md:row-start-3 md:mt-4"
      v-html="$t('footer.copyright', { date: new Date().getFullYear() })"
    ></p>
    <!-- <div class="col-start-6 row-start-3 hidden justify-end md:flex">
      <button
        class="btn-base btn-white shadow-box btn-center btn btn-border-purple border-2 px-2.5 font-semibold lg:px-0"
      >
        <NavbarDropDownLang :menu-position-top="true"></NavbarDropDownLang>
      </button>
    </div> -->
  </footer>
</template>

<script>
import i18n from 'i18next'

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

      footerLinks: computed(() => [
        {
          title: i18n.t('home.collections.title'),
          routeName: 'collections',
        },
        // {
        //   title: i18n.t('claim.title'),
        //   routeName: 'claim',
        // },
        {
          title: i18n.t('rewards.title'),
          routeName: 'rewards',
        },
        {
          title: i18n.t('launchpad.link'),
          // link: 'https://fewfar.io/launchpad/',
          routeName: 'launchpad',
        },
        // {
        //   title: i18n.t('minting.link'),
        //   routeName: 'minting',
        // },
        {
          title: i18n.t('footer.links.blog'),
          link: 'https://medium.com/few-and-far',
        },
      ]),
      footerLinks2: [
        {
          title: i18n.t('footer.links.help'),
          link: 'https://knowledge.fewfar.com/help',
        },
        {
          title: i18n.t('footer.links.support'),
          link: 'mailto:support@fewfar.com',
        },
        {
          title: i18n.t('footer.links.contact'),
          link: 'mailto:contact@fewfar.com',
        },
        {
          title: i18n.t('footer.links.tos'),
          link: 'https://docs.fewfar.com/legal/terms-of-service.html',
        },
      ],
      footerLinks3: [
        {
          title: i18n.t('footer.links.about'),
          link: 'https://project.fewfar.com/',
        },
        // {
        //   title: i18n.t('footer.links.platform'),
        //   link: 'https://fewfar.io/about/platform/',
        // },
        // {
        //   title: i18n.t('footer.links.partnership'),
        //   link: 'https://fewfar.io/about/partnerships/',
        // },
        // {
        //   title: i18n.t('footer.links.whitepaper'),
        //   link: 'https://docs.fewfar.com/',
        // },
      ],
    }
  },
}
</script>
