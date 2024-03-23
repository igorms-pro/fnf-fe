import { useNuxtApp, useRuntimeConfig } from '#imports'

const GAS = '100000000000000'
const GAS_MORE = '200000000000000'

export default function () {
  const { MARKET_CONTRACT } = useRuntimeConfig()

  const {
    $near: { nearAPI, wallet, userAccountId },
  } = useNuxtApp()

  const { utils } = nearAPI

  const contract = new nearAPI.Contract(
    wallet.value.account(),
    MARKET_CONTRACT,
    {
      viewMethods: [
        'storage_balance_of',
        'storage_minimum_balance',
        'get_sale',
        'get_sales_by_owner_id',
        'get_sales_by_nft_contract_id',
      ],
      changeMethods: [
        'storage_deposit',
        'offer',
        'update_price',
        'accept_offer',
        'remove_sale',
        'cancel_offer',
      ],
      sender: wallet.value.account(),
    }
  )

  /**
   * Function for depositing NEAR to the blockchain to use on chain storage.
   * TODO: Refactor this function to dynamically calculate how much storage
   * is needed and reserve only that amount.
   * @param {Number} price The price of the NFT that will be listed after this
   * deposit is made
   * @returns {Boolean} Boolean for wether or not more storage space was allocated.
   */
  const makeStorageDeposit = async (price = null) => {
    /**
     * returns total amount that a user has stored NOT how much they have left
     * therefore amt will ALWAYS be less than storageMinimumBalance
     * to compensate for this, we are counting the number of slaes we have active,
     * mulitplying that times the amount of storage we are allocating for each sale
     * and depositing more storage if we need it.
     */
    const amt = await contract.storage_balance_of({
      account_id: userAccountId.value,
    })

    // Returns a list of active sales for the user
    const sales = await contract.get_sales_by_owner_id({
      account_id: userAccountId.value,
      from_index: '0',
      limit: 10000,
    })

    // Returns the required storage amount for a listing
    const storageMinimumBalance = await contract.storage_minimum_balance()

    // If the total amount of storage is less than the number of sales tiems
    // the price of storing one of them, then get more storage.
    if (amt < storageMinimumBalance * (sales.length + 1)) {
      await contract.storage_deposit(
        price ? { amount: price, msg: 'listNFT' } : {},
        GAS,
        utils.format.parseNearAmount('0.1')
      )
      return true // More storage was allocated
    }

    return false // More storage was not necessary
  }

  const offer = async (contractId, tokenId, amount) => {
    return await contract.offer(
      {
        nft_contract_id: contractId,
        token_id: tokenId,
      },
      GAS_MORE,
      utils.format.parseNearAmount(amount.toString())
    )
  }

  const removeSale = async (contractId, tokenId) => {
    return await contract.remove_sale(
      {
        nft_contract_id: contractId,
        token_id: tokenId,
      },
      GAS,
      '1'
    )
  }

  const acceptOffer = async (contractId, tokenId, ftTokenId = 'near') => {
    return await contract.accept_offer(
      {
        nft_contract_id: contractId,
        token_id: tokenId,
        ft_token_id: ftTokenId,
      },
      GAS_MORE
    )
  }

  const getSale = async (contractId, tokenId) => {
    const DELIMETER = '||'

    const sale = await contract.get_sale({
      nft_contract_token: contractId + DELIMETER + tokenId,
    })

    return sale
  }

  const getSalesForCollection = async (
    contractId,
    fromIndex = 0,
    limit = 10
  ) => {
    return await contract.get_sales_by_nft_contract_id({
      nft_contract_id: contractId,
      from_index: fromIndex.toString(),
      limit,
    })
  }

  const getSalesForUser = async (
    userAccountId,
    fromIndex = '0',
    limit = 10
  ) => {
    return await contract.get_sales_by_owner_id({
      account_id: userAccountId,
      from_index: fromIndex.toString(),
      limit,
    })
  }

  const cancelOffer = async (contractId, tokenId, ftTokenId = 'near') => {
    return contract.cancel_offer(
      {
        nft_contract_id: contractId,
        token_id: tokenId,
        ft_token_id: ftTokenId,
      },
      GAS,
      '1'
    )
  }

  return {
    contract,

    makeStorageDeposit,
    acceptOffer,
    removeSale,
    cancelOffer,
    getSale,
    offer,

    getSalesForUser,
    getSalesForCollection,
  }
}
