/* global $fetch */

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useNuxtApp } from '#imports'
import useContractMarket from '@/composables/useContractMarket'

export const useUser = defineStore('user', {
  state: () => {
    return {
      id: null,

      profile: {
        accountId: null,
        nearBalance: null,
        implicitAccountId: null,
        displayName: null,
        email: null,
        bio: null,
        createdAt: null,
        updatedAt: null,
      },

      auth: {
        accessToken: null,
      },

      nft: {
        contractNames: [],
        items: [],
        nftItems: null,
        sales: null,
      },
    }
  },

  getters: {},

  actions: {
    async init() {
      const {
        $near: { isSignedIn },
      } = useNuxtApp()
      const storedAccessToken = useStorage('access-token')

      if (isSignedIn.value) {
        if (
          !storedAccessToken.value ||
          storedAccessToken.value === 'undefined'
        ) {
          const accessToken = await this.fetchAccessToken()

          // store access token
          storedAccessToken.value = accessToken
        }

        // store the access token in the store
        this.auth.accessToken = storedAccessToken.value

        // get user profile
        this.getProfile()
      }
    },

    async fetchAccessToken() {
      const {
        $near: { verifySignature, userAccountId },
        $fetch,
      } = useNuxtApp()

      const verifiedSignature = await verifySignature(userAccountId.value)

      const { access_token: accessToken } = await $fetch('/auth/sign-in', {
        method: 'POST',
        body: verifiedSignature,
      })

      // store the access token in localstorage
      const storedAccessToken = useStorage('access-token')
      storedAccessToken.value = accessToken

      this.auth.accessToken = accessToken
      this.profile.implicitAccountId = verifiedSignature.implicitAccountId

      return accessToken
    },

    async checkAccessToken() {
      const decodeJWT = () => {
        const token = useStorage('access-token')
        const base64Url = token.value.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
            })
            .join('')
        )

        return JSON.parse(jsonPayload)
      }

      const expiredDate = decodeJWT(this.auth?.accessToken)?.exp
      const isExpired = expiredDate * 1000 <= Date.now()

      if (isExpired) {
        // refresh the token
        await this.fetchAccessToken()
      }
    },

    async refreshAccountId() {
      const { $fetch } = useNuxtApp()

      await this.checkAccessToken()

      const data = await $fetch(`/profile/refresh-account-id`, {
        headers: {
          Authorization: `Bearer ${this.auth?.accessToken}`,
        },
      })

      return data
    },

    async getProfile() {
      const {
        $near: { verifySignature, userAccountId },
        $fetch,
      } = useNuxtApp()

      if (!this.profile.implicitAccountId) {
        const res = await verifySignature(userAccountId.value)
        this.profile.implicitAccountId = res.implicitAccountId
      }

      await this.checkAccessToken()

      const headers = {
        Authorization: `Bearer ${this.auth?.accessToken}`,
      }
      const [profileInfo, profileBalance] = await Promise.all([
        $fetch(`/profile/${userAccountId.value}`, {
          headers,
        }),
        await $fetch(`/profile/account-info`, {
          headers,
        }),
      ])

      // TODO - nearBalance remember to parseNearAmount
      this.setUserProfile({
        accountId: userAccountId.value,
        nearBalance: profileBalance.balance,
        implicitAccountId: profileInfo.address,
        email: profileInfo.email,
        displayName: profileInfo.displayName,
        bio: profileInfo.bio,
        createdAt: profileInfo.createdAt,
        updatedAt: profileInfo.updatedAt,
      })

      return this.profile
    },

    async updateProfile(payload) {
      const { $fetch } = useNuxtApp()

      await this.checkAccessToken()

      await $fetch('/profile', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.auth?.accessToken}`,
        },
        body: payload,
      })

      this.setUserProfile(payload)

      return payload
    },

    setUserProfile(payload) {
      const {
        accountId,
        nearBalance,
        implicitAccountId,
        email,
        displayName,
        bio,
        createdAt,
        updatedAt,
      } = payload

      this.profile = {
        accountId,
        nearBalance,
        implicitAccountId,
        email,
        displayName,
        bio,
        createdAt,
        updatedAt,
      }

      return payload
    },

    /**
     * Async function to retrieve list of NFTs and load into store
     * @returns List of NFTs owned by a user
     */
    async getUserNFTs() {
      const { $fetch } = useNuxtApp()

      await this.checkAccessToken() // Ensure user is logged in

      // Hit endpoint to getNFTs
      const nftList = await $fetch(`/profile/my-nfts`, {
        headers: {
          Authorization: `Bearer ${this.auth?.accessToken}`,
        },
      })

      this.nft.nftItems = nftList // Save NFTs to store
      return nftList // Return list
    },

    /**
     * //FOR NOW only this call can tell us the real ownerId of the saler
     * //@deprecated Will be removed soon.
     * @returns List of NFTs a user has listed for sale
     */
    async getSales() {
      const {
        $near: { userAccountId },
      } = useNuxtApp()

      const { getSalesForUser } = useContractMarket()
      const listedNft = []
      this.nft.sales = await getSalesForUser(userAccountId.value)
      this.nft.sales.forEach((saleItem) => {
        const item = this.nft.nftItems.find(
          (item) => item.tokenSeriesId === saleItem.token_id
        )
        // filter out previous listed nft
        if (item) {
          // use blockchain price until BE endpoint is fixed
          item.nearPrice = saleItem.sale_conditions.near
          listedNft.push(item)
        }
      })

      this.nft.sales = listedNft
      return this.nft.sales
    },

    /**
     * Async function to load NFT data into the store
     */
    async getUserNFTData() {
      await this.getUserNFTs() // Retrieve list of a user's NFTs
      await this.getSales() // Remove once SM / BE are updated
    },

    async getActivities() {
      const { $fetch } = useNuxtApp()

      await this.checkAccessToken()

      return $fetch(`/profile/user-activities?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${this.auth?.accessToken}`,
        },
      })
    },

    async getOffersReceived() {
      const { $fetch } = useNuxtApp()

      await this.checkAccessToken()

      return $fetch(`/profile/offers-received?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${this.auth?.accessToken}`,
        },
      })
    },

    async getOffersMade() {
      const { $fetch } = useNuxtApp()

      await this.checkAccessToken()

      return $fetch(`/profile/offers-made`, {
        headers: {
          Authorization: `Bearer ${this.auth?.accessToken}`,
        },
      })
    },
  },
})
