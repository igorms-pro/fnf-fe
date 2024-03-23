<template>
  <div class="pt-4">
    <div class="pb-6">
      <p
        class="text-left text-base font-semibold text-grey-300 dark:text-grey-light2"
      >
        {{ title }}
      </p>
    </div>
    <ul>
      <li
        v-for="{
          id,
          contractId,
          media,
          media256,
          media512,
          media1024,
          name,
          description,
          isVerified,
        } in searchItems"
        :key="id"
        class="py-4 pr-10"
      >
        <nuxt-link
          class="group mb-5 cursor-pointer"
          @click="
            /* condition on type is temporary until we implement a user profile page  */
            handleClick(id, contractId)
          "
        >
          <div class="flex items-center justify-between">
            <div class="h-20 w-20 flex-none">
              <BaseImg
                :media="media"
                :alt="name"
                class="h-full w-full rounded-lg"
                :img-set="
                  createImageSet({
                    256: media256,
                    512: media512,
                    1024: media1024,
                  })
                "
              />
            </div>
            <div
              class="relative min-w-0 flex-auto pl-2 text-left font-semibold"
            >
              <p class="truncate text-base group-hover:text-purple">
                {{ name }}
              </p>
              <p
                class="mt-2 flex space-x-1 text-sm text-grey-300 group-hover:text-purple dark:text-grey-light2"
              >
                <span class="truncate">
                  {{
                    isVerified
                      ? $t('collection.verifiedListing')
                      : $t('collection.unverifiedListing')
                  }}
                </span>
                <IconListing
                  v-if="isVerified"
                  class="h-5 w-5 flex-none fill-current text-purple"
                />
              </p>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import IconListing from '~/assets/images/icons/verified-macaron.svg?component'
import { useRouter, useSearchDialogState } from '#imports'
import utils from '~/utils'

export default defineComponent({
  components: {
    IconListing,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    searchItems: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const ITEM_TYPE = {
      COLLECTION: 'collection',
      PROFILE: 'profile',
      ITEM: 'item',
    }

    const { setShowDialog } = useSearchDialogState()
    const router = useRouter()

    const handleClick = async (id, contractId) => {
      if (!id && !contractId) return
      const { type } = props
      const isCollection = type === ITEM_TYPE.COLLECTION
      const name = isCollection ? 'collection-id' : 'item-detail-contractId-id'
      const params = { id, contractId }
      const refresh =
        router.currentRoute.value.name === name && !contractId && isCollection

      if (type !== 'profile') setShowDialog(false)

      await router.push({
        name,
        params,
      })
      // Manually refresh page when you're on the collection page and you search for another collection
      if (refresh) router.go()
    }

    return {
      setShowDialog,
      createImageSet: utils.createImageSet,
      handleClick,
    }
  },
})
</script>
