<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        as="div"
        class="hidden items-center justify-between space-x-3 px-4 lg:flex"
      >
        <img class="h-6 w-6" src="~/assets/images/avatar.png" alt="Avatar" />
        <span class="truncate">
          <slot name="titleButton" />
        </span>
        <IconTriangle></IconTriangle>
      </MenuButton>
      <MenuButton as="div" class="flex items-center lg:hidden">
        <img class="h-11 w-11" src="~/assets/images/avatar.png" alt="Avatar" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="shadow-box dark-mode dark-mode-duration absolute right-0 z-30 mt-4 w-80 origin-top-right divide-y divide-grey-150 rounded-md border-0 border-transparent bg-white dark:divide-grey-300 dark:border dark:border-grey-300"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <nuxt-link
              :to="{ name: 'user-profile' }"
              class="my-4 mx-5 flex space-x-3 py-2"
            >
              <img
                class="h-10 w-10"
                src="~/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="flex flex-col text-left">
                <span class="text-sm font-semibold md:text-base">
                  <slot name="titleAccount" />
                </span>
                <span
                  :class="[
                    active ? 'text-purple' : 'text-grey-200',
                    'flex w-full items-center text-base font-medium',
                  ]"
                >
                  {{ $t('navBar.dropDownMenu.myProfile') }}
                </span>
              </div>
            </nuxt-link>
          </MenuItem>
        </div>
        <div class="">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'text-purple' : '',
                'link-dropdown-profile js-clipboard group ',
              ]"
              @click="$emit('copyAccountIdHook', true)"
            >
              <IconCopy class="h-5 w-5 group-hover:text-purple" />
              <span>{{ $t('navBar.dropDownMenu.copyAddress') }}</span>
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'text-purple' : '',
                'link-dropdown-profile group',
              ]"
              @click.prevent="setConnectModalOpen(true)"
            >
              <IconChange class="h-5 w-5 group-hover:text-purple" />
              <span>{{ $t('navBar.dropDownMenu.changeWallet') }}</span>
            </button>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <nuxt-link
              :class="[
                active ? 'text-purple' : '',
                'link-dropdown-profile group',
              ]"
              :to="WALLET_URL"
              target="_blank"
            >
              {{ title }}
              <IconNearWallet
                v-if="!isDark"
                class="h-6 w-6 group-hover:text-purple"
              />
              <IconNearWalletDark
                v-if="isDark"
                class="h-6 w-6 group-hover:text-purple"
              />
              <span>{{ $t('navBar.dropDownMenu.goToNearWallet') }}</span>
            </nuxt-link>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'text-purple' : '',
                'link-dropdown-profile group',
              ]"
              @click="logout"
            >
              <IconDisconnect class="h-5 w-5 group-hover:text-purple" />
              <span>{{ $t('navBar.dropDownMenu.disconnect') }}</span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useStorage } from '@vueuse/core'
import IconTriangle from '~/assets/images/icons/triangle.svg?component'
import IconDisconnect from '~/assets/images/icons/disconnect.svg?component'
import IconChange from '~/assets/images/icons/change.svg?component'
import IconCopy from '~/assets/images/icons/copy.svg?component'
import IconNearWallet from '~/assets/images/icons/near-wallet.svg?component'
import IconNearWalletDark from '~/assets/images/icons/near-wallet-dark.svg?component'

import {
  defineComponent,
  useConnectDialogState,
  useDark,
  useNuxtApp,
  useRouter,
} from '#imports'

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,

    IconNearWalletDark,
    IconTriangle,
    IconDisconnect,
    IconNearWallet,
    IconChange,
    IconCopy,
  },
  emits: ['copyAccountIdHook'],

  setup() {
    const {
      $near: { signOut, self },
    } = useNuxtApp()

    const router = useRouter()
    const WALLET_URL = self.value.config.walletUrl
    const { isDark } = useDark()

    const logout = () => {
      signOut()
      // delete access token when logout
      const storedAccessToken = useStorage('access-token', '')
      storedAccessToken.value = null
      router.push('/')
    }

    const { setShowDialog: setConnectModalOpen } = useConnectDialogState()

    return {
      logout,
      setConnectModalOpen,

      WALLET_URL,
      isDark,
    }
  },
})
</script>

<style lang="postcss" scoped>
.link-dropdown-profile {
  @apply flex w-full items-center space-x-5 px-2 py-6 pl-5 text-sm font-semibold last:rounded-b-lg hover:bg-grey-light3 dark:hover:bg-black/40 md:text-base;
}
</style>
