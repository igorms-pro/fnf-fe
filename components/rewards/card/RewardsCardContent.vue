<template>
  <div class="">
    <div class="flex items-center">
      <div class="flex w-full items-center justify-start">
        <p class="text-sm font-semibold md:text-base">
          {{ title }}
        </p>

        <VTooltip
          class="inline-flex px-2"
          placement="bottom"
          :triggers="['hover', 'click', 'touch', 'focus']"
          :distance="10"
        >
          <IconRoundedQuestionMark
            class="ml-2 h-4 w-4 text-black dark:text-grey-light2"
          />
          <template #popper>
            <div class="h-auto w-auto justify-center px-2 md:w-96 md:px-4">
              {{ tooltipContent }}
            </div>
          </template>
        </VTooltip>
      </div>
    </div>
    <div
      :class="[
        'my-0 md:my-2',
        {
          'text-grey-200': isBalanceTokenEmpty(tokenBalance),
        },
      ]"
    >
      <div class="flex items-center text-lg font-semibold md:text-2xl">
        <img
          v-if="!isNear"
          :src="
            imgAlt === $t('common.nearCoin')
              ? icons.IconNearCoin
              : icons.IconFarCoin
          "
          :alt="imgAlt"
          class="mt-5 h-8 w-8 xl:h-10 xl:w-10"
        />
        <div>
          <div v-if="!isNear" class="flex items-center">
            <p class="mx-2 w-auto break-all">
              {{ formatNumeral(tokenBalance) }}
            </p>
            <span> {{ unit }} </span>
          </div>

          <div v-if="isNear" class="flex items-center">
            <div>
              <LogoNear
                class="text-lg md:text-2xl"
                :logo-class-name="[
                  '!h-5 !w-5 !ml-2',
                  {
                    '!text-grey-200': isBalanceTokenEmpty(tokenBalance),
                  },
                ]"
              >
                <img
                  src="~/assets/images/icons/fnf/near-coin.svg"
                  :alt="$t('common.nearCoin')"
                  class="mt-5 h-8 w-8 xl:h-10 xl:w-10"
                />
                <div>
                  <p class="mx-2 w-auto break-all">
                    {{ formatNumeral(tokenBalance) }}
                  </p>
                  <p
                    class="ml-2"
                    v-html="
                      $t('currencies.usd', {
                        amount: formatNumeral(tokenBalance * tokenFarUSDValue),
                        greyclass: isBalanceTokenEmpty(tokenBalance)
                          ? '!text-grey-200'
                          : '',
                      })
                    "
                  ></p>
                </div>
              </LogoNear>
            </div>
          </div>
          <p
            v-if="!isNear"
            class="ml-2"
            v-html="
              $t('currencies.usd', {
                amount: formatNumeral(tokenBalance * tokenFarUSDValue),
                greyclass: isBalanceTokenEmpty(tokenBalance)
                  ? '!text-grey-200'
                  : '',
              })
            "
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import i18n from 'i18next'
import IconRoundedQuestionMark from '~/assets/images/icons/fnf/rounded-question_mark.svg?component'
import IconFarCoin from '~/assets/images/icons/fnf/far-coin.svg'
import IconNearCoin from '~/assets/images/icons/fnf/near-coin.svg'

export default defineComponent({
  components: {
    IconRoundedQuestionMark,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    tokenBalance: {
      type: [String, Number],
    },
    tooltipContent: {
      type: String,
      require: true,
      default: () => i18n.t('footer.links.help'),
    },
  },
  setup(props) {
    const { formatNumeral } = useFormat()

    // TODO get real conversion FAR-USD
    const tokenFarUSDValue = 0.2

    const isBalanceTokenEmpty = (token) => {
      return !token || token === '0'
    }

    const isNear = computed(() => props.unit === 'NEAR')

    return {
      icons: {
        IconFarCoin,
        IconNearCoin,
      },

      tokenFarUSDValue,
      isNear,

      isBalanceTokenEmpty,
      formatNumeral,
    }
  },
})
</script>

<style lang="postcss" scoped>
.v-popper__wrapper {
  @apply px-4 md:px-0;
}
</style>
