<template>
  <Disclosure
    id="nav-bar"
    v-slot="{ open }"
    as="nav"
    class="dark-mode dark-mode-duration bg-white text-black shadow"
  >
    <div class="px-5 sm:px-6 lg:px-8">
      <div
        class="grid h-20 w-full grid-cols-2 items-center lg:flex lg:gap-4 xl:grid xl:grid-cols-3"
      >
        <nuxt-link
          :to="{ name: 'index' }"
          class="group flex w-fit items-center"
        >
          <img
            class="block h-6 w-auto duration-100 ease-linear group-hover:rotate-90 md:h-8"
            src="~/assets/images/icons/fnf/logo.svg?url"
            alt="Few and Far"
          />
          <p class="ml-2 block md:h-5 md:w-auto">
            <FnFLogo class="h-4 w-32 text-black dark:text-white"></FnFLogo>
          </p>
          <div
            class="relative ml-0 block rounded-lg bg-purple-light py-1 px-1.5 text-xs font-bold uppercase text-black dark:bg-purple dark:text-white md:ml-2 md:py-1.5 md:px-2"
          >
            Beta
          </div>
        </nuxt-link>

        <div
          class="mr-0 hidden justify-center lg:ml-4 lg:flex lg:flex-grow lg:space-x-2 xl:space-x-4"
        >
          <template v-for="(nav, index) in navs" :key="index">
            <nuxt-link
              v-if="nav.routeName"
              :to="{
                name: nav.routeName ?? 'index',
                params: nav?.routeParams ?? {},
              }"
              :class="{
                'border-purple': index === 0,
                'border-transparent': index > 0,
                'text-grey-500 ': index !== navs.length - 1,
                'text-fnf-gradient animate-text-color hover:text-fnf-gradient-hover dark:hover:text-fnf-gradient-dark':
                  index === navs.length - 1,
              }"
              class="inline-flex items-center whitespace-nowrap border-b-2 border-transparent px-2 py-3 text-sm font-bold hover:rounded-lg hover:bg-purple-light hover:bg-opacity-50 hover:text-purple dark:hover:bg-purple-opacity dark:hover:bg-opacity-100 lg:px-2 lg:text-base"
            >
              {{ nav.title }}
            </nuxt-link>
            <nuxt-link
              v-else
              :href="nav.external"
              target="_self"
              :class="{
                'border-purple': index === 0,
                'border-transparent': index > 0,
                'text-grey-500 ': index !== navs.length - 1,
                'text-fnf-gradient animate-text-color hover:text-fnf-gradient-hover dark:hover:text-fnf-gradient-dark':
                  index === navs.length - 1,
              }"
              class="inline-flex items-center whitespace-nowrap border-b-2 border-transparent px-2 py-3 text-sm font-bold hover:rounded-lg hover:bg-purple-light hover:bg-opacity-50 hover:text-purple dark:hover:bg-purple-opacity dark:hover:bg-opacity-100 lg:px-2 lg:text-base"
            >
              {{ nav.title }}
            </nuxt-link>
          </template>
        </div>
        <div class="justify-self-end">
          <div class="-ml-1.5 flex items-center space-x-1.5 lg:space-x-2.5">
            <DialogConnection
              :is-open="connectModalOpen"
              :success-url="successUrl"
              :fail-url="failUrl"
              @close="setConnectModalOpen(false)"
            />
            <button
              v-if="!open"
              type="button"
              class="btn-rounded btn-icon-base shadow-box btn-border-purple ml-2 border-2"
              @click="setSearchModalOpen(!searchModalOpen)"
            >
              <IconSearch></IconSearch>
            </button>
            <button
              type="button"
              :class="[
                open ? 'flex' : 'hidden lg:flex',
                'btn-rounded btn-icon-base shadow-box btn-border-purple ml-2 flex border-2',
              ]"
              @click="toggleDark()"
            >
              <IconDarkModeMoon v-if="!isDark"></IconDarkModeMoon>
              <IconDarkModeSun v-else></IconDarkModeSun>
            </button>
            <!-- <button
              :class="[
                open ? 'flex' : 'hidden lg:flex',
                'btn-base btn-white shadow-box btn-center btn btn-border-purple rounded-lg border-2 px-2.5 font-semibold lg:px-0',
              ]"
            >
              <NavbarDropDownLang></NavbarDropDownLang>
            </button> -->
            <template v-if="!open">
              <template v-if="!isSignedIn">
                <button
                  class="btn btn-primary btn-border-primary btn-base hidden border-2 font-semibold lg:flex"
                  @click="setConnectModalOpen(true)"
                >
                  {{ $t('navBar.connectWallet') }}
                </button>
                <button
                  class="btn-rounded btn-icon-base shadow-box btn-primary btn-border-b-rounded border-b-purple-dark lg:hidden"
                  @click="setConnectModalOpen(true)"
                >
                  <IconWallet></IconWallet>
                </button>
              </template>
              <template v-else>
                <VTooltip
                  class="inline-flex"
                  placement="bottom"
                  :triggers="[]"
                  :shown="copied"
                >
                  <button
                    class="btn-base lg:btn-white lg:shadow-box btn-center btn lg:btn-border-purple px-0 font-semibold lg:flex lg:border-2"
                  >
                    <UserProfileDropDownConnect
                      @copy-account-id-hook="copy(userAccountId)"
                    >
                      <template #titleButton>
                        {{ formatAccountId(userAccountId) }}
                      </template>
                      <template #titleAccount>
                        {{ formatAccountId(userAccountId) }}
                      </template>
                    </UserProfileDropDownConnect>
                  </button>

                  <template #popper> {{ $t('common.state.copied') }} </template>
                </VTooltip>
              </template>
            </template>
            <DisclosureButton
              class="btn-text-size shadow-box btn-white dark-mode dark-mode-duration flex h-11 w-11 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border-2 border-transparent bg-white p-1 text-xs hover:border-purple active:border-transparent active:bg-grey-light lg:hidden"
              @click="bodyScroll(!open)"
            >
              <span class="sr-only"> {{ $t('navBar.openMainMenu') }} </span>
              <IconMenu v-if="!open" aria-hidden="true"></IconMenu>
              <IconClose v-else aria-hidden="true"></IconClose>
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel
      v-slot="{ close }"
      class="scrollbar dark-mode dark-mode-duration absolute inset-x-0 top-[73px] z-30 mx-auto h-full origin-top transform overflow-y-auto bg-white bg-opacity-[97%] pb-[73px] lg:hidden"
    >
      <div class="px-5 py-8">
        <div class="space-y-8">
          <template v-for="(nav, index) in navs" :key="index">
            <nuxt-link
              v-if="nav.routeName"
              :to="{
                name: nav.routeName ?? 'index',
                params: nav?.routeParams ?? {},
              }"
              :class="{
                'block py-2 text-2xl font-bold text-grey-400 dark:text-white':
                  index !== navs.length - 1,
                ' text-fnf-gradient animate-text-color block py-2 text-2xl font-bold':
                  index === navs.length - 1,
              }"
              @click="onNavigation(close)"
            >
              <component :is="nav.icon" class="mr-3 inline h-8 w-8"></component>
              {{ nav.title }}
            </nuxt-link>
            <nuxt-link
              v-else
              href="https://project.fewfar.com/"
              target="blank"
              :class="{
                'block py-2 text-2xl font-bold text-grey-400 dark:text-white':
                  index !== navs.length - 1,
                ' text-fnf-gradient animate-text-color block py-2 text-2xl font-bold':
                  index === navs.length - 1,
              }"
              @click="onNavigation(close)"
            >
              <component :is="nav.icon" class="mr-3 inline h-8 w-8"></component>
              {{ nav.title }}
            </nuxt-link>
          </template>
        </div>
        <div class="mt-10 space-y-4">
          <div
            v-for="({ title, routeName, link }, i) in footerLinks"
            :key="i"
            class="text-sm font-semibold leading-8 text-grey-400 dark:text-white"
          >
            <nuxt-link
              :to="link ? link : { name: routeName }"
              target="_self"
              @click="onNavigation(close)"
            >
              {{ title }}
            </nuxt-link>
          </div>
          <div class="flex space-x-2.5">
            <!-- todo: links -->
            <nuxt-link
              v-for="({ link, icon }, i) in socialLinks"
              :key="i"
              class="btn-rounded btn-icon-lg shadow-box btn-border-purple border-2"
              target="_blank"
              :href="link"
            >
              <component :is="icon"></component>
            </nuxt-link>
          </div>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <DialogSearch :is-open="searchModalOpen" @close="setSearchModalOpen(false)" />
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useClipboard } from '@vueuse/core'

import i18n from 'i18next'
import {
  defineComponent,
  ref,
  useAccountIdFormat,
  useBodyScroll,
  useConnectDialogState,
  useDark,
  useSearchDialogState,
} from '#imports'

import { useCollections } from '~/stores/collections'

import FnFLogo from '~/assets/images/icons/fnf/fnf.svg?component'
import IconSearch from '~/assets/images/icons/search-icon.svg?component'
import IconWallet from '~/assets/images/icons/wallet.svg?component'
import IconClose from '~/assets/images/icons/close.svg?component'
import IconMenu from '~/assets/images/icons/menu.svg?component'
import IconDarkModeMoon from '~/assets/images/icons/dark-mode.svg?component'
import IconDarkModeSun from '~/assets/images/icons/sun.svg?component'
import IconDiscord from '~/assets/images/icons/socials/discord.svg?component'
import IconTwitter from '~/assets/images/icons/socials/twitter.svg?component'
import IconInstagram from '~/assets/images/icons/socials/instagram.svg?component'
import IconExplorer from '~/assets/images/icons/explorer.svg?component'
import IconCollection from '~/assets/images/icons/collections.svg?component'
import IconLaunchpad from '~/assets/images/icons/launchpad.svg?component'
import IconMinting from '~/assets/images/icons/minting.svg?component'
import IconTokens from '~/assets/images/icons/fnf/tokens.svg?component'
import IconRewards from '~/assets/images/icons/fnf/rewards.svg?component'
import IconClock from '~/assets/images/icons/clock.svg?component'
import IconProject from '~/assets/images/icons/project.svg?component'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,

    FnFLogo,
    IconSearch,
    IconWallet,
    IconClose,
    IconMenu,
    IconDarkModeMoon,
    IconDarkModeSun,
    IconExplorer,
    IconCollection,
    IconTokens,
    IconRewards,
    IconClock,

    IconDiscord,
    IconTwitter,
    IconInstagram,
  },

  setup() {
    const {
      $near: { userAccountId, isSignedIn, signOut },
    } = useNuxtApp()

    const collectionsStore = useCollections()

    const navs = computed(() => [
      // TODO: Remove if we decide not to fix this feature
      // {
      //   title: i18n.t('footer.links.explore'),
      //   icon: IconExplorer,
      //   routeName: 'collection-id',
      //   routeParams: {
      //     id: collectionsStore?.collectionExplorerId ?? '0',
      //   },
      // },
      {
        title: i18n.t('home.collections.title'),
        icon: IconCollection,
        routeName: 'collections',
      },
      // {
      //   title: i18n.t('claim.title'),
      //   icon: IconTokens,
      //   routeName: 'claim',
      // },
      {
        title: i18n.t('launchpad.link'),
        icon: IconLaunchpad,
        // external: 'https://fewfar.io/launchpad/',
        routeName: 'launchpad',
      },
      {
        title: i18n.t('minting.link'),
        icon: IconMinting,
        routeName: 'minting',
      },
      {
        title: i18n.t('footer.links.about'),
        icon: IconProject,
        external: 'https://project.fewfar.com/',
      },
      {
        title: i18n.t('rewards.title'),
        icon: IconRewards,
        routeName: 'rewards',
      },
    ])

    const footerLinks = [
      {
        title: i18n.t('launchpad.link'),
        // link: 'https://fewfar.io/launchpad/',
        routeName: 'launchpad',
      },
      {
        title: i18n.t('minting.link'),
        routeName: 'minting',
      },
      {
        title: i18n.t('footer.links.blog'),
        link: 'https://medium.com/few-and-far',
      },
      {
        title: i18n.t('footer.links.help'),
        link: 'https://knowledge.fewfar.com/help',
      },
      {
        title: i18n.t('footer.links.tos'),
        link: 'https://docs.fewfar.com/legal/terms-of-service.html',
      },
    ]

    const socialLinks = [
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
    ]

    const { isDark, toggleDark } = useDark()

    const {
      showDialog: connectModalOpen,
      setShowDialog: setConnectModalOpen,
      successUrl,
      failUrl,
    } = useConnectDialogState()

    const { showDialog: searchModalOpen, setShowDialog: setSearchModalOpen } =
      useSearchDialogState()

    const { formatAccountId } = useAccountIdFormat()
    const { bodyScroll } = useBodyScroll()

    const onNavigation = (close) => {
      bodyScroll(!open)
      close()
    }

    const { copy, copied } = useClipboard()

    return {
      userAccountId,
      isSignedIn,
      signOut,

      onNavigation,
      bodyScroll,

      navs,
      footerLinks,
      socialLinks,

      connectModalOpen,
      setConnectModalOpen,
      successUrl,
      failUrl,

      searchModalOpen,
      setSearchModalOpen,

      formatAccountId,

      isDark,
      toggleDark,

      copy,
      copied,
    }
  },
})
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply text-purple;
}
</style>
