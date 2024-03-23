<template>
  <Popover v-slot="{ open, close }" class="pt-1.5">
    <VTooltip
      class="inline-flex"
      placement="top"
      :distance="10"
      :triggers="['hover']"
    >
      <PopoverButton>
        <IconShare
          class="mx-1.5 h-4 w-4 cursor-pointer"
          :alt="$t('common.action.share')"
        />
      </PopoverButton>
      <template #popper> {{ $t('common.action.share') }} </template>
    </VTooltip>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        v-if="open"
        class="absolute left-1/2 z-10 mt-3 w-72 -translate-x-1/2 transform px-4 sm:px-0 md:left-auto lg:max-w-3xl"
      >
        <div
          class="dark-mode rounded-md bg-white py-5 drop-shadow-md dark:bg-black dark:text-white"
        >
          <VTooltip
            class="inline-flex"
            placement="top"
            :triggers="[]"
            :distance="10"
            :shown="copied"
          >
            <button
              class="link-dropdown-share group hover:text-purple dark:hover:text-purple"
              @click="copy()"
            >
              <IconCopy class="h-5 w-5" />
              <span>{{ $t('common.action.copyToClipboard') }}</span>
            </button>
            <template #popper> {{ $t('common.state.copied') }}</template>
          </VTooltip>
          <nuxt-link
            v-for="{ link, title, icon } in shareLinks"
            :key="link"
            :href="link"
            :alt="title"
            target="_blank"
            class="link-dropdown-share hover:text-purple"
            @click="close()"
          >
            <component
              :is="icon"
              class="fill-white dark:fill-black"
            ></component>
            <span> {{ title }}</span>
          </nuxt-link>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { useClipboard } from '@vueuse/core'
import i18n from 'i18next'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { defineComponent } from '#imports'
import IconCopy from '~/assets/images/icons/copy.svg?component'
import IconTwitterRounded from '~/assets/images/icons/socials/rounded/twitter.svg?component'
import IconShare from '~/assets/images/icons/share.svg?component'
import IconFacebook from '~/assets/images/icons/socials/facebook.svg?component'
import IconTelegramRounded from '~/assets/images/icons/socials/rounded/telegram.svg?component'

export default defineComponent({
  components: {
    IconCopy,
    IconTwitterRounded,
    IconShare,
    IconFacebook,
    IconTelegramRounded,
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  setup() {
    const currentLocation = window.location.href
    const { copy, copied } = useClipboard({
      source: currentLocation,
    })

    // TODO ADD real link to share
    const shareLinks = [
      {
        title: i18n.t('common.action.shareOn', {
          media: i18n.t('socials.facebook'),
        }),
        link: 'https://facebook.com/',
        icon: IconFacebook,
      },
      {
        title: i18n.t('common.action.shareOn', {
          media: i18n.t('socials.twitter'),
        }),
        link: 'https://twitter.com/FewandFarNFT',
        icon: IconTwitterRounded,
      },
      {
        title: i18n.t('common.action.shareOn', {
          media: i18n.t('socials.telegram'),
        }),
        link: `https://telegram.me/share/url?url=${currentLocation}`,
        icon: IconTelegramRounded,
      },
    ]
    return {
      shareLinks,

      copy,
      copied,
    }
  },
})
</script>

<style lang="postcss" scoped>
.link-dropdown-share {
  @apply flex w-full items-center space-x-5 px-2 py-2 pl-5 text-sm font-semibold  md:text-base;
}
</style>
