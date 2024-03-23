<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="~/assets/images/backgrounds/mask-radial-user-profile.svg"
          alt="mask-radial-user-profile"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="container relative z-10 py-6 lg:py-20">
        <div class="lg:flex lg:justify-between lg:space-x-20">
          <div class="lg:w-1/2">
            <div class="flex">
              <img
                class="mr-6 h-20 w-20 lg:h-[180px] lg:w-[180px]"
                src="~/assets/images/avatar.png"
                alt="Avatar"
              />
              <div class="break-words">
                <p class="title mb-4 w-full truncate font-bold">
                  {{
                    userStore.profile.displayName ||
                    formatAccountId(userAccountId)
                  }}
                </p>
                <VTooltip
                  class="inline-flex"
                  placement="right"
                  :triggers="[]"
                  :shown="copied"
                >
                  <button
                    class="btn-base btn-white shadow-box btn-center btn btn-border-purple pd-4 rounded-lg border-2 px-4 font-semibold"
                    @click="copy(userAccountId)"
                  >
                    {{ formatAccountId(userAccountId) }}
                    <IconCopy class="ml-3"></IconCopy>
                  </button>
                  <template #popper> {{ $t('common.state.copied') }}</template>
                </VTooltip>

                <p
                  class="my-4 hidden text-grey-200 dark:text-grey-light2 lg:block"
                >
                  {{ userStore.profile.bio }}
                </p>
                <div class="hidden space-x-2.5 lg:mt-8 lg:flex">
                  <button
                    class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl font-bold"
                    @click="editProfileModalOpen = true"
                  >
                    {{ $t('profile.overview.editProfile') }}
                  </button>
                  <DialogUserProfileEdit
                    :is-open="editProfileModalOpen"
                    @close="editProfileModalOpen = false"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- TODO: Implement when rewards are ready -->
          <!-- <div class="lg:w-1/2">
            <div class="mt-6 flex w-full space-x-2 sm:space-x-3 lg:mt-0">
              <UserProfileStatCard class="w-1/2">
                <template #title>
                  {{ $t('profile.overview.totalTraded') }}
                </template>
                <template #content-simple>
                  <div class="flex items-center space-x-2 lg:text-xl">
                    <img
                      src="~/assets/images/icons/fnf/near-coin.svg"
                      :alt="$t('common.nearCoin')"
                      class="h-8 w-8 lg:h-6 lg:w-6 xl:h-10 xl:w-10"
                    />
                    <p class="text-number">
                      {{ formatNumeral(totalTraded) }}
                    </p>
                  </div>
                </template>
              </UserProfileStatCard>
              <UserProfileStatCard class="w-1/2">
                <template #title>
                  {{ $t('profile.overview.totalStaked') }}
                </template>
                <template #content-simple>
                  <img
                    src="~/assets/images/icons/fnf/far-coin.svg"
                    :alt="$t('common.farCoin')"
                    class="h-8 w-8 lg:h-6 lg:w-6 xl:h-10 xl:w-10"
                  />
                  <span class="text-number">
                    {{ formatNumeral(0) }}
                  </span>
                </template>
              </UserProfileStatCard>
            </div>
            <UserProfileStatCard class="mt-2 sm:mt-3">
              <template #title>
                {{ $t('profile.overview.totalEarned') }}
              </template>
              <template #content-detailed>
                <div class="lg:flex lg:items-center lg:justify-between">
                  <div
                    class="flex space-x-4 lg:block lg:space-x-0 lg:space-y-4"
                  >
                    <div class="flex items-center space-x-2 lg:text-xl">
                      <img
                        src="~/assets/images/icons/fnf/near-coin.svg"
                        :alt="$t('common.nearCoin')"
                        class="h-8 w-8 lg:h-6 lg:w-6 xl:h-10 xl:w-10"
                      />
                      <p class="text-number">
                        {{ formatNumeral(0) }}
                      </p>
                    </div>
                    <span class="opacity-10 lg:hidden">|</span>
                    <p class="flex items-center space-x-2 lg:text-xl">
                      <img
                        src="~/assets/images/icons/fnf/far-coin.svg"
                        :alt="$t('common.farCoin')"
                        class="h-8 w-8 lg:h-6 lg:w-6 xl:h-10 xl:w-10"
                      />
                      <span class="text-number">
                        {{ formatNumeral(0) }}
                      </span>
                    </p>
                  </div>
                  <nuxt-link
                    :to="{ name: 'rewards' }"
                    class="btn btn-brand btn-border-b btn-center btn-sm dark:btn-brand-dark mt-4 inline-flex w-full border-2 border-b-4 px-6 font-bold lg:w-fit"
                  >
                    <img
                      src="~/assets/images/icons/fnf/prism.svg"
                      alt="icon prism"
                      class="mr-2"
                    />
                    {{ $t('rewards.title') }}</nuxt-link
                  >
                </div>
              </template>
            </UserProfileStatCard>

            <div class="mt-4 flex space-x-2 lg:hidden">
              <button
                class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-1/2 font-bold"
                @click="editProfileModalOpen = true"
              >
                {{ $t('profile.overview.editProfile') }}
              </button>
            </div>
          </div> -->
        </div>
      </div>
    </section>

    <section class="container py-5">
      <ul
        class="container-snap flex w-full snap-x gap-x-2.5 self-start overflow-x-scroll pb-5 lg:justify-center lg:overflow-auto lg:px-0"
      >
        <li
          v-for="{ title, routeName } in snapLinks"
          :key="title"
          class="snap-start"
        >
          <nuxt-link
            :to="{ name: routeName }"
            class="btn btn-lg btn-white shadow-box btn-border-purple block rounded-lg border-2 font-bold"
          >
            {{ title }}
          </nuxt-link>
        </li>
      </ul>
      <section class="mb-24">
        <NuxtPage />
      </section>
    </section>
  </div>
</template>

<script>
import { useClipboard } from '@vueuse/core'

import i18n from 'i18next'
import primsIcon from '~/assets/images/icons/fnf/prism.svg'
import IconCopy from '~/assets/images/icons/copy.svg?component'

import {
  defineComponent,
  onMounted,
  useAccountIdFormat,
  useNuxtApp,
  useRouter,
} from '#imports'

import { useUser } from '~/stores/user'

export default defineComponent({
  components: {
    IconCopy,
  },

  setup() {
    const {
      $near: { userAccountId, signOut },
    } = useNuxtApp()

    const router = useRouter()
    const userStore = useUser()

    onMounted(async () => {
      await userStore.getUserNFTData() // returns "Listed Items" and "My Items"
    })

    const { formatAccountId } = useAccountIdFormat()
    const { formatNumeral } = useFormat()
    const totalTraded = ref(0)

    const logout = () => {
      signOut()
      router.push('/')
    }

    const editProfileModalOpen = ref(false)

    const snapLinks = [
      { title: i18n.t('profile.sections.myItems'), routeName: 'user-profile' },
      {
        title: i18n.t('profile.sections.listedItems'),
        routeName: 'user-profile-listed-items',
      },
      {
        title: i18n.t('profile.sections.offersMade'),
        routeName: 'user-profile-offers-made',
      },
      {
        title: i18n.t('profile.sections.offersReceived'),
        routeName: 'user-profile-offers-received',
      },
      {
        title: i18n.t('itemDetail.section.activities'),
        routeName: 'user-profile-activities',
      },
    ]

    const { copy, copied } = useClipboard()

    return {
      userStore,
      logout,
      userAccountId,
      formatNumeral,
      formatAccountId,

      primsIcon,
      totalTraded,
      editProfileModalOpen,

      snapLinks,

      copy,
      copied,
    }
  },
})
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply border-purple bg-purple  text-white  hover:border-blue hover:bg-blue active:border-blue active:bg-blue;
}

.text-number {
  @apply text-sm font-semibold sm:text-base md:text-xl lg:text-base xl:text-xl;
}
</style>
