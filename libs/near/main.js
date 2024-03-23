import * as nearAPI from 'near-api-js'
import * as bs58 from 'bs58'
import { useRuntimeConfig } from '#imports'

export function getConfig(nearNet, options = {}) {
  const config = {
    ...options,
    appTitle: options.appTitle || 'Few and Far',
  }

  switch (nearNet) {
    case 'mainnet':
      return {
        ...config,
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        explorerUrl: 'https://nearblocks.io',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        contractName: 'fewandfar.near',
        websiteUrl: 'https://fewfar.com',
      }
    case 'testnet':
      return {
        ...config,
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        explorerUrl: 'https://testnet.nearblocks.io',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        contractName: 'fewandfar.testnet',
        websiteUrl: 'https://dev.fewfar.com',
      }
    case 'betanet':
      return {
        ...config,
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        explorerUrl: 'https://explorer.betanet.near.org',
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
        websiteUrl: 'https://fewfar.com',
      }
    case 'local':
      return {
        ...config,
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        websiteUrl: 'https://localhost:3000',
      }
    case 'test':
    case 'ci':
      return {
        ...config,
        networkId: 'shared-test',
        nodeUrl: 'https://rpc.ci-testnet.near.org',
        masterAccount: 'test.near',
      }
    case 'ci-betanet':
      return {
        ...config,
        networkId: 'shared-test-staging',
        nodeUrl: 'https://rpc.ci-betanet.near.org',
        masterAccount: 'test.near',
      }
    default:
      throw new Error(`Unconfigured environment '${env}'`)
  }
}

export default async function setupNearApi() {
  if (!process.client) return {}

  const { connect, keyStores, WalletConnection, WalletAccount } = nearAPI
  const runtimeConfig = useRuntimeConfig()

  const keyStore = new keyStores.BrowserLocalStorageKeyStore()

  const config = {
    ...getConfig(runtimeConfig.NEAR_NET),
    keyStore,
  }

  const verifySignature = async (accountId) => {
    function bufferToHex(buffer) {
      return [...new Uint8Array(buffer)]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }

    const keyPair = await keyStore.getKey(config.networkId, accountId)

    const pk = keyPair.getPublicKey()?.toString()
    const pk58 = pk?.split(':')[1]

    if (!pk) {
      throw new Error('Cannot get public key')
    }

    const implicitAccountId = bufferToHex(
      nearAPI.utils.PublicKey.fromString(pk58).data
    )

    const messageToSign = {
      accountId,
    }

    const msg = Buffer.from(JSON.stringify(messageToSign))

    const { signature } = keyPair.sign(msg)

    const payload = {
      signedMessage: bs58.encode(msg),
      publicKey: pk,
      signature: bs58.encode(signature),
      implicitAccountId,
    }

    return payload
  }

  // connect to NEAR
  const near = await connect(config)

  // create wallet connection
  const wallet = new WalletConnection(near)

  // wallet account
  const user = new WalletAccount(near)

  // near api js will try to access to process.env and will crash if process is undefined
  if (runtimeConfig.NODE_ENV === 'development') {
    process.env = {}
  } else if (process.client) {
    window.process = {
      env: {},
    }
  }

  return {
    nearAPI,
    near, // TODO: rename nearInstance
    wallet,
    user,
    verifySignature,
  }
}
