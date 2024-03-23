import {
  useContractFarming,
  useContractRefFinance,
  useContractToken,
} from './useRewardsContracts'
import { computed, ref } from '#imports'

const tokenLPBalance = ref(null)
const tokenLPStakedBalance = ref(null)
const tokenFarBalance = ref(null)
const tokenFarStakedBalance = ref(null)
const earnedFar = ref(null)
const earnedNear = ref(null)
const farmedFar = ref(null)
const farmingApr = ref(null)
const stakingApr = ref(null)

export default function () {
  const { FNF_SEED_IDS } = useContractFarming()

  const { getFarTokenBalance } = useContractToken()

  const { getLPTokenBalance } = useContractRefFinance()
  const {
    getFarStakedBalance,
    // getLPTokenStakedBalance,

    listFarmsBySeed,
    getUnclaimedReward,
  } = useContractFarming()

  const setEarnedFarAndNearRewards = async () => {
    const farms = await listFarmsBySeed(FNF_SEED_IDS.FAR)

    if (farms && farms.length > 0) {
      // TODO confirmation one farm per token

      // Two rewards for FAR staking
      const farmNearRewards = farms.find((farm) => farm.reward_token === 'near')
      const farmFarRewards = farms.find(
        (farm) => farm.reward_token === FNF_SEED_IDS.FAR
      )

      // get unclaimed for both rewards
      const [rewardsFar, rewardsNear] = await Promise.all([
        getUnclaimedReward(farmFarRewards.farm_id),
        getUnclaimedReward(farmNearRewards.farm_id),
      ])

      earnedFar.value = rewardsFar
      earnedNear.value = rewardsNear

      // TODO change next PR
      farmedFar.value = rewardsFar
    }
  }

  const initFarmingBalances = async () => {
    const [
      balanceLPT,
      //   balanceStakedLPT
    ] = await Promise.all([
      getLPTokenBalance(),
      // getLPTokenStakedBalance(FNF_SEED_IDS.value.LPT),
    ])

    tokenLPBalance.value = balanceLPT
    farmingApr.value = {
      duration180d: 30,
      duration7d: 30,
    }
    // tokenLPStakedBalance.value = balanceStakedLPT
  }

  const initStakingBalances = async () => {
    const [balanceStakedFar, balanceFar] = await Promise.all([
      getFarStakedBalance(FNF_SEED_IDS.FAR),
      getFarTokenBalance(),
      setEarnedFarAndNearRewards(),
    ])
    // TODO not real user staked value
    tokenFarStakedBalance.value = balanceStakedFar
    tokenFarBalance.value = balanceFar

    stakingApr.value = {
      duration180d: 30,
      duration7d: 30,
    }
  }

  return {
    tokenLPBalance: computed(() => tokenLPBalance.value),
    tokenLPStakedBalance: computed(() => tokenLPStakedBalance.value),
    tokenFarBalance: computed(() => tokenFarBalance.value),
    tokenFarStakedBalance: computed(() => tokenFarStakedBalance.value),
    earnedFar: computed(() => earnedFar.value),
    earnedNear: computed(() => earnedNear.value),
    farmedFar: computed(() => farmedFar.value),

    farmingApr: computed(() => farmingApr.value),
    stakingApr: computed(() => stakingApr.value),

    initFarmingBalances,
    initStakingBalances,
  }
}
