<template>
  <div class="my-4 w-full">
    <BaseImg
      :media="media"
      :alt="name"
      class="w-full rounded-lg shadow-md lg:hidden"
      :img-set="imgSet"
    />
    <p class="mt-4 ml-4 truncate text-2xl font-bold md:ml-0" :alt="name">
      {{ name }}
    </p>
    <div class="mt-2 flex justify-between">
      <nuxt-link
        :alt="name"
        :to="{ name: 'collection-id', params: { id: collectionAccountId } }"
      >
        <p
          class="ml-4 flex items-center space-x-1 font-semibold text-purple md:ml-0"
        >
          <span class="truncate">{{ collectionName }}</span>

          <IconVerifiedMacaron
            v-if="collectionIsVerified"
            class="h-5 w-5 fill-current text-purple"
            :alt="$t('collection.verifiedCollection')"
          />
        </p>
      </nuxt-link>
      <div class="flex items-center dark:text-purple">
        <VTooltip
          class="inline-flex"
          placement="top"
          :distance="10"
          :triggers="['hover', 'focus']"
        >
          <IconRefresh
            :class="[
              'mx-1 h-5 w-5 cursor-pointer',
              {
                'animate-spin text-blue outline-none focus:outline-none':
                  isLoading,
              },
            ]"
            :alt="$t('common.action.refresh')"
            @click="refreshData"
          >
          </IconRefresh>
          <template #popper> {{ $t('common.action.refresh') }} </template>
        </VTooltip>

        <VTooltip
          class="inline-flex"
          placement="top"
          :distance="10"
          :triggers="['hover', 'focus']"
        >
          <!-- //TODO  middleware: add the  contract value  -->
          <LinkNearExplorer
            :value-id="collectionAccountId"
            value-type="address"
          >
            <LogoNear
              logo-class-name="mx-1 !h-4 !w-4 cursor-pointer dark:!text-purple hover:text-blue dark:hover:!text-blue"
            />
          </LinkNearExplorer>
          <template #popper> {{ $t('rewards.action.viewContract') }} </template>
        </VTooltip>
        <ItemDetailActionShare />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '#imports'
import IconRefresh from '~/assets/images/icons/refresh.svg?component'
import IconVerifiedMacaron from '~/assets/images/icons/verified-macaron.svg?component'

export default defineComponent({
  components: {
    IconRefresh,
    IconVerifiedMacaron,
  },
  props: {
    media: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    collectionName: {
      type: String,
      required: true,
    },
    collectionAccountId: {
      type: String,
      required: true,
    },
    collectionIsVerified: {
      type: Boolean,
      default: false,
    },
    imgSet: {
      type: Array,
    },
  },

  setup() {
    const isLoading = ref(false)

    return {
      isLoading,
    }
  },

  methods: {
    refreshData() {
      this.isLoading = true

      // TODO Remove the setTimeout by backend call (refresh data of this page)
      setTimeout(() => {
        this.isLoading = false
      }, 2250)
    },
  },
})
</script>

<style scoped lang="postcss">
.tooltip:hover .tooltiptext {
  @apply opacity-100 transition-opacity delay-200 ease-in-out;
}
</style>
