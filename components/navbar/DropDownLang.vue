<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        as="div"
        class="flex items-center justify-between space-x-1.5 py-px text-xs lg:px-2.5"
      >
        <IconI18n></IconI18n>
        <span class="font-semibold uppercase">
          {{ storeLang.currentLang?.code }}
        </span>
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
        :class="[
          menuPositionTop ? '-top-4 -translate-y-full ' : 'mt-4',
          'shadow-box max-w-80 dark-mode dark-mode-duration absolute right-0 z-50 w-72 origin-top-right rounded-md border-0 border-transparent bg-white dark:border dark:border-grey-300',
        ]"
      >
        <template v-for="{ title, lang } in storeLang.langs" :key="lang">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'text-purple' : 'text-gray-900',
                'flex w-full items-center space-x-5 py-4 px-3 pl-5 text-base font-semibold first:rounded-t-xl last:rounded-b-xl hover:bg-grey-light3 hover:text-purple dark:hover:bg-black/40',
              ]"
              @click="storeLang.changeLang(lang)"
            >
              <span>{{ title }}</span>
            </button>
          </MenuItem>
        </template>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { defineComponent, ref } from '#imports'
import { useLang } from '~/stores/lang'

import IconI18n from '~/assets/images/icons/i18n.svg?component'

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    IconI18n,
  },
  props: {
    menuPositionTop: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const storeLang = useLang()

    return {
      storeLang,
    }
  },
})
</script>
