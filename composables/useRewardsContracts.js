import i18n from 'i18next'
import useFormat from './useFormat'
import { throwError, useNuxtApp, useRuntimeConfig } from '#imports'

const FAR_DECIMAL = Number(1e8)
const GAS = '100000000000000'
const ONE_YOCTO = '1'

const getContractsIds = () => {
  const { NEAR_NET } = useRuntimeConfig()

  const CONTRACT_ID =
    NEAR_NET === 'mainnet'
      ? {
          REF_FINANCE: 'ref-finance-101.near',
          FARMING: 'farm.fewandfar.near',
          FAR_TOKENS: 'fartokens.fewandfar.near',
        }
      : {
          REF_FINANCE: 'ref-finance-101.testnet',
          FARMING: 'farm.fewandfar.testnet',
          FAR_TOKENS: 'fartokens.fewandfar.testnet',
        }

  return {
    ...CONTRACT_ID,
  }
}

const getRefFinancePoolAndUrls = () => {
  const { NEAR_NET } = useRuntimeConfig()

  // TODO - UPDATE WITH REAL MAINNET TOKEN ID
  const REF_FINANCE_POOL_TOKEN_ID = NEAR_NET === 'mainnet' ? '584' : '583'
  const REF_FINANCE_URL =
    NEAR_NET === 'mainnet'
      ? 'https://app.ref.finance'
      : 'https://testnet.ref.finance'

  // TODO - UPDATE WITH REAL MAINNET SWAP URL
  const REF_FINANCE_SWAP_FAR_TOKEN_HASH_URL =
    NEAR_NET === 'mainnet'
      ? '#wrap.near|fartokens.fewandfar'
      : '#wrap.testnet|fartokens.fewandfar.testnet'

  return {
    REF_FINANCE_SWAP_FAR_TOKEN_HASH_URL,
    REF_FINANCE_POOL_TOKEN_ID,
    REF_FINANCE_URL,
  }
}

export const useContractFarming = () => {
  const { formatNumeral } = useFormat()
  const {
    $near: { nearAPI, wallet, userAccountId },
  } = useNuxtApp()

  const CONTRACTS = getContractsIds()
  const { REF_FINANCE_POOL_TOKEN_ID } = getRefFinancePoolAndUrls()

  // getters
  const FNF_SEED_IDS = {
    FAR: CONTRACTS.FAR_TOKENS,
    LPT: `${CONTRACTS.REF_FINANCE}@${REF_FINANCE_POOL_TOKEN_ID}`,
  }

  // few and far contracts instances

  const contractFarming = new nearAPI.Contract(
    wallet.value.account(),
    CONTRACTS.FARMING,
    {
      viewMethods: [
        'get_seed_info',
        'get_unclaimed_reward',
        'list_farms_by_seed',
      ],
      changeMethods: [
        'withdraw_seed',
        'withdraw_reward',
        'claim_reward_by_seed',
      ],
      sender: wallet.value.account(),
    }
  )

  // view functions
  const listFarmsBySeed = async (seedId) => {
    return await contractFarming.list_farms_by_seed({
      seed_id: seedId,
    })
  }

  // call functions
  const getUnclaimedReward = async (farmId) => {
    const unclaimedReward = await contractFarming.get_unclaimed_reward({
      account_id: userAccountId.value,
      farm_id: farmId,
    })

    return unclaimedReward
  }

  const getFarStakedBalance = async (seedId) => {
    const seedInfo = await contractFarming.get_seed_info({
      seed_id: seedId,
    })
    if (seedInfo !== null && !isNaN(seedInfo.amount))
      return formatNumeral(seedInfo.amount / FAR_DECIMAL)

    throwError(i18n.t('rewards.errorBalance'))
  }

  const getLPTokenStakedBalance = async (seedId) => {
    const seedInfo = await contractFarming.get_seed_info({
      seed_id: seedId,
    })

    // TODO need to know if near amount & far amount
    if (seedInfo !== null && !isNaN(seedInfo.amount))
      return formatNumeral(
        nearAPI.utils.format.formatNearAmount(seedInfo.amount)
      )

    throwError(i18n.t('rewards.errorBalance'))
  }

  const unstakeToken = async (amount) => {
    const amountFAR = parseFloat(amount) * FAR_DECIMAL

    return await contractFarming.withdraw_seed(
      {
        seed_id: CONTRACTS.FAR_TOKENS,
        amount: amountFAR.toString(),
      },
      GAS,
      ONE_YOCTO
    )
  }

  // this one will have seedID as param in the next PR
  const claimRewardBySeed = async () => {
    return await contractFarming.claim_reward_by_seed(
      {
        seed_id: CONTRACTS.FAR_TOKENS,
      },
      GAS
    )
  }

  return {
    FNF_SEED_IDS,

    listFarmsBySeed,
    getUnclaimedReward,
    getFarStakedBalance,
    getLPTokenStakedBalance,
    unstakeToken,
    claimRewardBySeed,
  }
}

export const useContractToken = () => {
  const { formatNumeral } = useFormat()
  const {
    $near: { nearAPI, wallet, userAccountId },
  } = useNuxtApp()
  const { utils } = nearAPI
  const CONTRACTS = getContractsIds()

  // contract
  const contractTokens = new nearAPI.Contract(
    wallet.value.account(),
    CONTRACTS.FAR_TOKENS,
    {
      viewMethods: [
        'ft_balance_of',
        'storage_balance_of',
        'storage_minimum_balance',
      ],
      changeMethods: ['ft_transfer_call', 'storage_deposit'],
      sender: wallet.value.account(),
    }
  )

  // view functions
  const makeStakingStorageDeposit = async () => {
    const amt = await contractTokens.storage_balance_of({
      account_id: userAccountId.value,
    })

    const storageMinimumBalance = await contractTokens.storage_minimum_balance()

    if (amt < storageMinimumBalance) {
      // redirects user to aproval storage deposit
      await contractTokens.storage_deposit(
        {},
        GAS,
        utils.format.parseNearAmount('0.1')
      )
      return true
    }

    return false
  }

  const getFarTokenBalance = async () => {
    const {
      $near: { userAccountId },
    } = useNuxtApp()

    const balance = await contractTokens.ft_balance_of({
      account_id: userAccountId.value,
    })

    if (balance !== null && !isNaN(balance))
      return formatNumeral(balance / FAR_DECIMAL)

    throwError(i18n.t('rewards.errorBalance'))
  }

  // call functions
  const stakeFARToken = async (amount) => {
    const amountFAR = amount * FAR_DECIMAL

    return await contractTokens.ft_transfer_call(
      {
        receiver_id: CONTRACTS.FARMING,
        amount: amountFAR.toString(),
        msg: '',
      },
      GAS,
      ONE_YOCTO
    )
  }

  return {
    makeStakingStorageDeposit,
    getFarTokenBalance,

    stakeFARToken,
  }
}

export const useContractRefFinance = () => {
  const { formatNumeral } = useFormat()

  const {
    $near: { nearAPI, wallet, userAccountId },
  } = useNuxtApp()

  const { utils } = nearAPI

  const CONTRACTS = getContractsIds()
  const {
    REF_FINANCE_URL,
    REF_FINANCE_SWAP_FAR_TOKEN_HASH_URL,
    REF_FINANCE_POOL_TOKEN_ID,
  } = getRefFinancePoolAndUrls()

  const URL_REF_FINANCE_BUY_FAR = `${REF_FINANCE_URL}/${REF_FINANCE_SWAP_FAR_TOKEN_HASH_URL}`
  const URL_REF_FINANCE_BUY_LPT = `${REF_FINANCE_URL}/pool/${REF_FINANCE_POOL_TOKEN_ID}`

  const contractRefFinance = new nearAPI.Contract(
    wallet.value.account(),
    CONTRACTS.REF_FINANCE,
    {
      viewMethods: [
        'mft_balance_of',
        'storage_balance_of',
        'storage_balance_bounds',
      ],
      changeMethods: ['mft_transfer_call', 'storage_deposit'],
      sender: wallet.value.account(),
    }
  )

  // view functions
  const getLPTokenBalance = async () => {
    const balance = await contractRefFinance.mft_balance_of({
      account_id: userAccountId.value,
      token_id: `:${REF_FINANCE_POOL_TOKEN_ID}`,
    })

    if (balance !== null && !isNaN(balance))
      return formatNumeral(nearAPI.utils.format.formatNearAmount(balance))

    throwError(i18n.t('rewards.errorBalance'))
  }

  // call functions
  const makeFarmingStorageDeposit = async () => {
    const amt = await contractRefFinance.storage_balance_of({
      account_id: userAccountId.value,
    })

    const storageMinimumBalance =
      await contractRefFinance.storage_balance_bounds()

    if (amt < storageMinimumBalance.min) {
      // redirects user to aproval storage deposit
      await contractRefFinance.storage_deposit(
        {
          account_id: userAccountId.value,
          registration_only: false,
        },
        GAS,
        utils.format.parseNearAmount('0.1')
      )

      return true
    }
    return false
  }

  const stakeLPToken = async (amount) => {
    return await contractRefFinance.mft_transfer_call(
      {
        receiver_id: CONTRACTS.FARMING,
        token_id: REF_FINANCE_POOL_TOKEN_ID,
        amount: utils.format.parseNearAmount(amount.toString()),
        msg: '',
      },
      GAS,
      ONE_YOCTO
    )
  }
  return {
    URL_REF_FINANCE_BUY_FAR,
    URL_REF_FINANCE_BUY_LPT,

    makeFarmingStorageDeposit,
    getLPTokenBalance,
    stakeLPToken,
  }
}
