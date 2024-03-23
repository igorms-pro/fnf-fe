import { Buffer } from 'buffer'
import setupNearApi, { getConfig } from '@/libs/near/main'
import { computed, defineNuxtPlugin, ref, useRuntimeConfig } from '#imports'

// setup Buffer
globalThis.Buffer = Buffer

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { contractName, appTitle } = getConfig(runtimeConfig.NEAR_NET)

  const near = ref(null)
  const wallet = ref(null)
  const user = ref(null)
  const result = await setupNearApi()

  near.value = result.near
  wallet.value = result.wallet
  user.value = result.user

  const isSignedIn = computed(() => wallet.value?.isSignedIn())
  const userAccountId = computed(() => wallet.value?.getAccountId())

  const signIn = async (successUrl = null, failureUrl = null) => {
    await wallet.value?.requestSignIn({
      contractId: contractName,
      appTitle,
      successUrl,
      failureUrl,
    })
  }

  const signOut = async () => {
    await wallet.value.signOut()
  }

  return {
    provide: {
      near: {
        nearAPI: result.nearAPI,
        self: computed(() => near.value),
        wallet: computed(() => wallet.value),
        user: computed(() => user.value),

        isSignedIn,
        signIn,
        signOut,
        verifySignature: result.verifySignature,

        userAccountId,
      },
    },
  }
})
