<template>
  <div>
    <div class="absolute inset-0">
      <img
        src="~/assets/images/backgrounds/mask-radial-rewards.svg"
        alt="mask-radial-rewards"
        class="h-full w-full object-cover dark:hidden"
      />
      <img
        src="~/assets/images/backgrounds/mask-radial-rewards_dark.svg"
        alt="mask-radial-rewards"
        class="hidden h-full w-full object-cover dark:block"
      />
    </div>
    <div
      class="container relative z-10 pt-9 lg:flex lg:items-center lg:justify-between lg:px-4"
    >
      <div>
        <div
          class="flex-col items-center justify-center text-center lg:flex lg:items-start lg:justify-start lg:text-left"
        >
          <p
            class="mb-3 text-2xl font-extrabold lg:text-3xl"
            v-html="$t('rewards.farmFar', { unit: 'FAR' })"
          ></p>

          <div class="inline-flex items-center">
            <p
              class="text-5xl font-extrabold lg:text-7xl"
              v-html="$t('rewards.farmFarAPR', { apr: fewAndFarApr })"
            ></p>
            <VTooltip
              class="inline-flex"
              placement="bottom"
              :distance="10"
              :triggers="['hover', 'click', 'touch', 'focus']"
            >
              <IconRoundedQuestionMark
                class="h-5 w-5 text-grey-200 dark:text-grey-light2"
              />
              <template #popper>
                <div
                  class="h-auto justify-center px-4 lg:w-96"
                  v-html="$t('rewards.tooltips.farming.apr')"
                ></div>
              </template>
            </VTooltip>
          </div>
        </div>
        <img
          :src="isDark ? imageFARStakingDark : imageFARStaking"
          class="lg:hidden"
        />
        <div class="lg:justify-left pb-5 lg:mt-8 lg:flex lg:space-x-3 lg:pb-0">
          <template v-if="REWARDS_COMING_SOON">
            <nuxt-link
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl inline-block w-full text-center font-bold lg:mt-2 lg:block lg:w-fit"
              href="https://docs.fewfar.com/"
              target="_blank"
            >
              {{ $t('common.action.learnMore') }}
            </nuxt-link></template
          >
          <template v-else>
            <nuxt-link
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-xl mt-2 inline-block w-full text-center font-bold lg:block lg:w-fit"
              :href="URL_REF_FINANCE_BUY_FAR"
              target="_blank"
            >
              {{ $t('rewards.action.buyFAR') }}
            </nuxt-link>
          </template>
          <nuxt-link
            class="btn btn-brand btn-border-b btn-xl dark:btn-brand-dark mt-2 inline-block w-full border-2 border-b-4 text-center font-bold lg:w-fit lg:pt-3"
            href="https://nearblocks.io/address/far.tokens.fewandfar.near#transaction"
            target="_blank"
          >
            {{ $t('rewards.action.viewContract') }}
          </nuxt-link>
        </div>
      </div>
      <div
        class="hidden lg:-mr-40 lg:block lg:w-3/4 xl:mr-0 xl:h-auto xl:w-auto"
      >
        <img :src="isDark ? imageFARStakingDark : imageFARStaking" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import IconRoundedQuestionMark from '~/assets/images/icons/fnf/rounded-question_mark.svg?component'
import imageFARStaking from '~/assets/images/far-staking.png'
import imageFARStakingDark from '~/assets/images/far-staking_dark.png'

export default defineComponent({
  components: {
    IconRoundedQuestionMark,
  },
  props: {
    fewAndFarApr: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const { isDark } = useDark()
    const { URL_REF_FINANCE_BUY_FAR } = useContractFarming()

    return {
      REWARDS_COMING_SOON: true,

      isDark,
      imageFARStaking,
      imageFARStakingDark,

      URL_REF_FINANCE_BUY_FAR,
    }
  },
})
</script>
