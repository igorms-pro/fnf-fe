<template>
  <div>
    <h1 class="title mt-6 mb-8 text-center font-bold lg:hidden">
      {{ $t('profile.sections.offersReceived') }}
    </h1>

    <template v-if="!offers">
      <UserProfileLoading />
    </template>

    <div class="flex flex-wrap space-y-1.5 lg:mt-6">
      <template v-if="offers && offers.length > 0">
        <div class="hidden w-full lg:flex lg:py-5">
          <p
            class="w-1/3 pl-5 text-sm font-semibold text-grey-200 dark:text-grey-light2"
          >
            {{ $t('itemDetail.tableHeader.item') }}
          </p>
          <p
            class="w-1/5 text-left text-sm font-semibold text-grey-200 dark:text-grey-light2"
          >
            {{ $t('itemDetail.tableHeader.price') }}
          </p>
          <p class="text-sm font-semibold text-grey-200 dark:text-grey-light2">
            {{ $t('itemDetail.tableHeader.address') }}
          </p>
        </div>
        <div
          v-for="{
            token_id: id,
            contract_id: contractId,
            metadata: { title: name, media: img },
            price,
            signer_account_id,
          } in offers"
          :key="name"
          class="shadow-box dark-mode dark-mode-duration w-full border-2 border-transparent px-3 py-5 hover:border-purple dark:border-grey-300 dark:text-white dark:hover:border-purple lg:flex lg:px-5 lg:py-4"
        >
          <div class="hidden w-1/3 lg:block">
            <div class="flex items-center space-x-4">
              <img class="h-12 w-12 rounded" :src="img" :alt="name" />
              <nuxt-link
                class="font-semibold hover:text-purple"
                :to="{
                  name: 'item-detail-contractId-id',
                  params: { contractId, id: id },
                }"
              >
                {{ name }}
              </nuxt-link>
            </div>
          </div>
          <div class="hidden w-1/5 text-center lg:block">
            <LogoNear class="mt-2">
              {{ formatNumeral(utils.format.formatNearAmount(price, 2)) }}
            </LogoNear>
          </div>
          <div class="hidden lg:block">
            <p class="mt-2">
              {{ formatAccountId(signer_account_id) }}
            </p>
          </div>
          <div class="flex space-x-3 overflow-hidden lg:hidden">
            <img class="h-12 w-12 rounded" :src="img" :alt="name" />
            <div>
              <nuxt-link
                class="font-semibold"
                :to="{
                  name: 'item-detail-contractId-id',
                  params: { contractId, id: id },
                }"
              >
                {{ name }}
              </nuxt-link>
              <div class="mt-3.5">
                <p
                  class="text-xs font-semibold text-grey-200 dark:text-grey-light2"
                >
                  {{ $t('itemDetail.tableHeader.address') }}
                </p>
                <p class="mt-2">
                  {{ formatAccountId(signer_account_id) }}
                </p>
              </div>
              <div class="mt-3.5">
                <p
                  class="text-xs font-semibold text-grey-200 dark:text-grey-light2"
                >
                  {{ $t('itemDetail.tableHeader.price') }}
                </p>
                <LogoNear class="mt-2">
                  {{ formatNumeral(utils.format.formatNearAmount(price, 2)) }}
                </LogoNear>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-if="offers && offers.length === 0" class="mx-auto">
        <img
          src="~/assets/images/empty-fridge.svg"
          :alt="$t('profile.sections.offersReceivedEmpty')"
        />
        <p class="mt-5 text-center text-lg font-semibold">
          {{ $t('profile.sections.offersReceivedEmpty') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, useAccountIdFormat } from '#imports'
import { useUser } from '~/stores/user'

export default defineComponent({
  setup() {
    const { formatNumeral } = useFormat()
    const userStore = useUser()
    const offers = ref(null)
    const {
      $near: { nearAPI },
    } = useNuxtApp()
    const { utils } = nearAPI

    const getOffersActivities = async () => {
      // get our nft items & offers received
      offers.value = await userStore.getOffersReceived()
    }
    onMounted(() => {
      getOffersActivities()
    })

    const { formatAccountId } = useAccountIdFormat()

    return { offers, utils, formatAccountId, formatNumeral }
  },
})
</script>
