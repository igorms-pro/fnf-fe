import { useNuxtApp, useRuntimeConfig } from '#imports'

export default function (contractId) {
  const { NEAR_RPC, MARKET_CONTRACT } = useRuntimeConfig()

  const {
    $near: { nearAPI, wallet, userAccountId },
  } = useNuxtApp()

  const { utils, providers } = nearAPI
  // 1 000 000 000 000 000 000 000 000    1 NEAR
  //               100 000 000 000 000    ??? too small
  // const GAS = '100000000000000' 1e-9 1*10^-9
  const GAS = utils.format.parseNearAmount('0.0000000001')
  const DEPOSIT = utils.format.parseNearAmount('0.01') // STORAGE DEPOSIT

  const contract = new nearAPI.Contract(wallet.value.account(), contractId, {
    viewMethods: ['nft_token', 'nft_tokens_for_owner'],
    changeMethods: ['nft_approve', 'nft_transfer'],
    sender: wallet.value.account(),
  })

  const getTransactionState = async (txHash) => {
    // see more https://docs.near.org/docs/api/rpc
    const provider = new providers.JsonRpcProvider(NEAR_RPC)
    return await provider.txStatus(txHash, userAccountId.value)
  }

  const getItem = async (tokenId) => {
    return await contract.nft_token({
      token_id: tokenId,
    })
  }

  const getItemsForUser = async (userAccountId) => {
    const { $fetch } = useNuxtApp()

    const items = await contract.nft_tokens_for_owner({
      account_id: userAccountId,
    })

    // attempt to fetch the indexed details from the API for this NFT
    for (let i = 0; i < items.length; i++) {
      try {
        const details = await $fetch(
          `/nft/${contract.contractId}/${items[i].token_id}`
        )
        items[i].metadata = details.metadata
      } catch {
        continue
      }
    }

    return items
  }

  const listItem = async (tokenId, price) => {
    const token = await getItem(tokenId)

    const saleConditions = {
      near: utils.format.parseNearAmount(price),
    }

    if (Object.keys(saleConditions).length + (token.royalty?.length ?? 0) > 8) {
      throw new Error(
        'Cannot have more than 8 royalties + sale collateral at the same time'
      )
    }

    return await contract.nft_approve(
      {
        token_id: tokenId,
        account_id: MARKET_CONTRACT,
        msg: JSON.stringify({
          sale_conditions: saleConditions,
        }),
      },
      GAS, // attached gas
      DEPOSIT // attached storage deposit
    )
  }

  const sendNFT = async (receiverId, tokenId) => {
    return await contract.nft_transfer(
      {
        receiver_id: receiverId,
        token_id: tokenId,
      },
      GAS,
      DEPOSIT
    )
  }

  return {
    contract,

    getItem,
    getItemsForUser,
    getTransactionState,

    listItem,
    sendNFT,
  }
}
