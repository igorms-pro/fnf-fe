<template>
  <div class="container md:p-0">
    <section>
      <RewardsSectionHeader>
        <template #title>
          {{ $t('rewards.farFarming.title') }}
        </template>
        <template #subtitle>{{ $t('rewards.farFarming.subTitle') }} </template>
      </RewardsSectionHeader>
    </section>

    <section>
      <!-- 180 days lockup -->
      <section>
        <div
          class="shadow-box relative my-4 p-5 dark:border dark:border-grey-300 dark:shadow-none md:min-h-[160px]"
        >
          <!-- apr -->
          <div class="md:flex md:items-center md:justify-between">
            <span class="text-xl font-bold capitalize">
              {{ $t('timeDuration.days', { number: 180 }) }}
              {{ $t('rewards.lockUpPeriod') }}
            </span>
            <div
              class="justify-left relative mt-8 flex h-14 w-full items-center rounded-lg border border-black/30 bg-purple/40 dark:border-grey-300 dark:bg-transparent md:mt-0 md:h-16 md:w-72"
            >
              <p class="px-3 text-2xl font-bold md:text-3xl">
                {{ farmingApr?.duration180d }}% APR
              </p>

              <VTooltip
                class="inline-flex text-sm md:block"
                placement="bottom"
                :triggers="['hover', 'click', 'touch', 'focus']"
                :distance="40"
                :skidding="-50"
                auto-boundary-max-size
              >
                <IconRoundedQuestionMark class="h-6 w-6" />
                <template #popper>
                  <div
                    class="h-auto justify-center px-4 md:w-96"
                    v-html="$t('rewards.tooltips.farming.apr')"
                  ></div>
                </template>
              </VTooltip>
              <img
                src="~/assets/images/Robot.svg"
                class="absolute right-0 h-28 w-16 md:h-32 md:w-20"
              />
            </div>
          </div>

          <!-- stake -->
          <section>
            <div class="mb-5 mt-10 md:mb-0">
              <div class="flex w-full items-center justify-start">
                <p class="text-sm md:text-base">
                  {{ $t('rewards.farFarming.stakeLPToken') }}
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
                    <div
                      class="h-auto w-auto justify-center px-2 md:w-96 md:px-4"
                    >
                      {{ $t('rewards.tooltips.farming.stake') }}
                    </div>
                  </template>
                </VTooltip>
              </div>

              <div class="md:flex md:w-full md:items-center md:justify-between">
                <BaseStakingInput
                  :input-value-max="tokenLPBalance"
                  unit="NEAR-FAR LP"
                  @update-value="stakeLptAmount = $event"
                />
                <div class="mt-4 md:mt-0">
                  <button
                    class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-full"
                    :disabled="!stakeLptAmount"
                    @click="stakeToken"
                  >
                    {{ $t('rewards.action.stake') }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- amount staked -->
          <section>
            <RewardsCard>
              <template #content-main>
                <RewardsCardContent
                  :title="$t('rewards.totalAmountStaked')"
                  :tooltip-content="
                    $t('rewards.tooltips.farming.totalAmountStaked')
                  "
                  :token-balance="tokenLPStakedBalance"
                  :img-alt="$t('common.nearCoin')"
                  unit="NEAR-FAR LP"
                />
              </template>
              <template #contain-main-button>
                <template v-if="!tokenLPStakedBalance">
                  <nuxt-link
                    :href="URL_REF_FINANCE_BUY_LPT"
                    target="_blank"
                    class="w-full"
                  >
                    <button
                      class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-full"
                    >
                      {{ $t('rewards.farFarming.buyNEARFARLPTokens') }}
                    </button>
                  </nuxt-link>
                </template>
                <template v-else>
                  <button
                    class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl w-full"
                    @click="unstakeFar"
                  >
                    {{ $t('rewards.action.unstake') }}
                  </button>
                </template>
              </template>
            </RewardsCard>
          </section>

          <!-- farmed Far -->
          <section>
            <RewardsCard>
              <template #content-main>
                <RewardsCardContent
                  :title="$t('rewards.farFarming.farmedFar')"
                  :tooltip-content="$t('rewards.tooltips.farming.farmedFar')"
                  :token-balance="farmedFar"
                  :img-alt="$t('common.farCoin')"
                  unit="FAR"
                />
              </template>
              <template #contain-main-button>
                <button
                  class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-full"
                  :disabled="!farmedFar"
                  @click="claimRewards"
                >
                  {{ $t('rewards.action.harvest') }}
                </button>
              </template>
            </RewardsCard>
          </section>
        </div>
      </section>

      <!-- 7  days lockup -->
      <section>
        <div
          class="shadow-box relative mt-10 p-5 dark:border dark:border-grey-300 dark:shadow-none md:min-h-[160px]"
        >
          <div class="md:flex md:items-center md:justify-between">
            <span class="text-xl font-bold capitalize">
              {{ $t('timeDuration.days', { number: 7 }) }}
              {{ $t('rewards.lockUpPeriod') }}
            </span>
            <div
              class="mt-6 flex h-14 w-full items-center justify-center rounded-lg border border-grey-185 dark:border-grey-300 dark:bg-transparent md:mt-0 md:w-52"
            >
              <p class="px-3 text-2xl font-bold md:text-3xl">
                {{ farmingApr?.duration7d }}% APR
              </p>

              <VTooltip
                class="inline-flex text-sm md:block"
                placement="bottom"
                :triggers="['hover', 'click', 'touch', 'focus']"
                :distance="40"
                :skidding="-50"
                auto-boundary-max-size
              >
                <IconRoundedQuestionMark class="h-4 w-4" />
                <template #popper>
                  <div
                    class="h-auto justify-center px-4 md:w-96"
                    v-html="$t('rewards.tooltips.farming.apr')"
                  ></div>
                </template>
              </VTooltip>
            </div>
          </div>

          <section>
            <div class="mb-5 mt-10 md:mb-0">
              <div class="flex w-full items-center justify-start">
                <p class="text-sm md:text-base">
                  {{ $t('rewards.farFarming.stakeLPToken') }}
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
                    <div
                      class="h-auto w-auto justify-center px-2 md:w-96 md:px-4"
                    >
                      {{ $t('rewards.tooltips.farming.stake') }}
                    </div>
                  </template>
                </VTooltip>
              </div>

              <div class="md:flex md:w-full md:items-center md:justify-between">
                <BaseStakingInput
                  :input-value-max="tokenLPBalance"
                  unit="NEAR-FAR LP"
                  @update-value="stakeLptAmount = $event"
                />
                <div class="mt-4 md:mt-0">
                  <button
                    class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-full"
                    :disabled="!stakeLptAmount"
                    @click="stakeToken"
                  >
                    {{ $t('rewards.action.stake') }}
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <RewardsCard>
              <template #content-main>
                <RewardsCardContent
                  :title="$t('rewards.totalAmountStaked')"
                  :tooltip-content="
                    $t('rewards.tooltips.farming.totalAmountStaked')
                  "
                  :token-balance="tokenLPStakedBalance"
                  :img-alt="$t('common.nearCoin')"
                  unit="NEAR-FAR LP"
                />
              </template>
              <template #contain-main-button>
                <template v-if="!tokenLPStakedBalance">
                  <nuxt-link
                    :href="URL_REF_FINANCE_BUY_LPT"
                    target="_blank"
                    class="w-full"
                  >
                    <button
                      class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-full"
                    >
                      {{ $t('rewards.farFarming.buyNEARFARLPTokens') }}
                    </button>
                  </nuxt-link>
                </template>
                <template v-else>
                  <button
                    class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl w-full"
                    @click="unstakeFar"
                  >
                    {{ $t('rewards.action.unstake') }}
                  </button>
                </template>
              </template>
            </RewardsCard>
          </section>
          <section>
            <RewardsCard>
              <template #content-main>
                <RewardsCardContent
                  :title="$t('rewards.farFarming.farmedFar')"
                  :tooltip-content="$t('rewards.tooltips.farming.farmedFar')"
                  :token-balance="farmedFar"
                  :img-alt="$t('common.farCoin')"
                  unit="FAR"
                />
              </template>
              <template #contain-main-button>
                <button
                  class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg w-full"
                  :disabled="farmedFar"
                  @click="claimRewards"
                >
                  {{ $t('rewards.action.harvest') }}
                </button>
              </template>
            </RewardsCard>
          </section>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import IconRoundedQuestionMark from '~/assets/images/icons/fnf/rounded-question_mark.svg?component'

export default defineComponent({
  components: {
    IconRoundedQuestionMark,
  },
  setup() {
    const stakeLptAmount = ref(0)

    const { claimRewardBySeed } = useContractFarming()

    const { URL_REF_FINANCE_BUY_LPT, makeFarmingStorageDeposit, stakeLPToken } =
      useContractRefFinance()

    const {
      tokenLPBalance,
      tokenLPStakedBalance,
      farmedFar,
      farmingApr,
      initFarmingBalances,
    } = useRewardsBalancesState()

    initFarmingBalances()
    const stakeToken = () => {
      if (
        stakeLptAmount.value > 0 &&
        stakeLptAmount.value <= tokenLPBalance.value
      ) {
        makeFarmingStorageDeposit()
        // TODO implement next PR
        // call storage_register ? /internal_register_account ?
        stakeLPToken(stakeLptAmount.value)
      }
    }

    // TODO  - implement next PR
    const unStakeToken = () => {}

    // TODO - implement next PR seedID
    const claimRewards = () => {
      claimRewardBySeed()
    }

    return {
      stakeLptAmount,

      URL_REF_FINANCE_BUY_LPT,
      tokenLPStakedBalance,
      tokenLPBalance,
      farmedFar,
      farmingApr,

      stakeToken,
      unStakeToken,
      claimRewards,
    }
  },
})
</script>
