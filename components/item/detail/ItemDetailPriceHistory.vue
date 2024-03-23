<template>
  <ItemDetailSectionCard v-if="priceHistory" :key="priceHistory">
    <template #content-title>
      <IconStats class="mr-2 h-5 w-5" />
      <p class="font-semibold">
        {{ $t('itemDetail.section.priceHistory') }}
      </p></template
    >
    <template v-if="priceHistory.length > 0" #content-section>
      <!-- TODO STILL ONGOING
      <Listbox v-model="selectedDate">
        <div class="relative mt-1">
          <ListboxButton
            class="focus-visible:ring-offset-orange-300 focus-visible:border-indigo-500 relative w-full cursor-default rounded-lg border border-grey-light2 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:border-grey-300 dark:bg-dark sm:text-sm"
            @click.stop
          >
            <span class="block truncate text-sm md:text-base">
              {{ selectedDate.period }}</span
            >
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <LogoNear class="mr-2 text-sm !text-purple md:text-base">
                234
              </LogoNear>

              <IconChevrowDown class="mr-2 h-3 w-3" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-grey-150 focus:outline-none dark:bg-dark dark:ring-grey-300 md:text-base"
            >
              <ListboxOption
                v-for="avgPeriod in avgPriceData"
                v-slot="{ active, selected }"
                :key="avgPeriod.period"
                :value="avgPeriod"
                as="template"
                class="bg-white dark:bg-dark"
                @click.stop
              >
                <li
                  :class="[
                    active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                    'border-b border-grey-150 dark:border-grey-300',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ avgPeriod.period }}</span
                  >
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox> -->
      <Charts :price-activities="priceHistory" />
    </template>
  </ItemDetailSectionCard>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import i18n from 'i18next'
import { format } from 'date-fns'
import { defineComponent, onMounted, useNuxtApp } from '#imports'
import IconStats from '~/assets/images/icons/stats.svg?component'
// import IconChevrowDown from '~/assets/images/icons/chevron-down.svg?component'

export default defineComponent({
  components: {
    // Listbox,
    // ListboxButton,
    // ListboxOption,
    // ListboxOptions,
    IconStats,
    // IconChevrowDown,
  },
  props: {
    contractId: {
      type: String,
    },
    tokenId: {
      type: String,
    },
  },
  setup(props) {
    const priceHistory = ref([])
    const {
      $near: { nearAPI },
      $fetch,
    } = useNuxtApp()

    const getPriceHistory = async () => {
      const data = await $fetch(
        `/nft/${props.contractId}/${encodeURIComponent(props.tokenId)}/price-history`
      )
      if (data?.length > 0) {
        priceHistory.value = data.map((itemPriceHistory) => {
          const secondsTimestamp =
            Number(itemPriceHistory.block_timestamp) / 1000000

          return {
            date: format(new Date(secondsTimestamp), "dd-MM-yy hh:mm aaaaa'm'"),
            price: parseFloat(
              nearAPI.utils.format.formatNearAmount(itemPriceHistory.price, 2)
            ),
          }
        })
      }
    }

    onMounted(async () => {
      getPriceHistory()
    })

    const avgPriceData = [
      { period: i18n.t('charts.period.allTimeAVGPrice') },
      { period: i18n.t('charts.period.lastWeeksAVGPrice') },
      { period: i18n.t('charts.period.lastTwoWeeksAVGPrice') },
      { period: i18n.t('charts.period.lastFourWeeksAVGPrice') },
      { period: i18n.t('charts.period.lastEightWeeksAVGPrice') },
      { period: i18n.t('charts.period.lastTwelveWeeksAVGPrice') },
    ]

    const selectedDate = ref(avgPriceData[0])
    return { selectedDate, avgPriceData, priceHistory }
  },
})
</script>
