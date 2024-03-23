<template>
  <section class="bg-purple text-center text-white">
    <div class="container">
      <div class="spacing-h-115" />
      <div class="px-5 md:px-14 lg:px-28">
        <div class="flex flex-col md:flex-row md:justify-center">
          <img
            src="~/assets/images/icons/fnf/palm-tree.svg"
            class="mx-auto md:mx-2 md:inline-flex"
            alt="icon palm-tree"
          />
          <p class="mt-2 px-4 text-base font-semibold md:px-0">
            {{ $t('home.preFooter.community') }}
          </p>
        </div>
        <h3
          class="mx-auto mt-5 mb-4 text-2xl font-extrabold md:mt-3.5 md:mb-4 md:w-2/3 md:text-5xl"
        >
          <h1 class="main-title">
            {{ $t('home.preFooter.reimagining') }}
          </h1>
        </h3>
        <p class="text-sm">
          {{ $t('home.preFooter.text') }}
        </p>
        <div class="mt-9 md:mt-11">
          <nuxt-link
            v-if="collectionExplorerId"
            :to="{
              name: 'collection-id',
              params: { id: collectionExplorerId },
            }"
            class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl font-semibold"
          >
            {{ $t('home.explore.action.exploreNFTs') }}
          </nuxt-link>
        </div>
      </div>
      <div class="spacing-h-115" />
    </div>
  </section>
</template>
<script>
import { useCollections } from '~/stores/collections'

export default {
  setup() {
    const collectionsStore = useCollections()
    const collectionExplorerId = computed(
      () => collectionsStore.collectionExplorerId ?? null
    )

    return {
      collectionExplorerId,
    }
  },
}
</script>
