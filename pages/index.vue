<template>
  <div>
    <!-- TODO: Remove Banner -->
    <!-- <HomeBannerHomePage bg-color="bg-blue">
      <template #title>
        {{ $t('launchpad.banner.title') }}
      </template>
      <template #text>
        {{ $t('launchpad.banner.desc') }}
      </template>
      <template #button>
        <nuxt-link
          href="https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform"
          target="_blank"
          class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-lg block font-semibold"
        >
          {{ $t('launchpad.banner.cta') }}
        </nuxt-link>
      </template>
    </HomeBannerHomePage> -->

    <HomeHero></HomeHero>

    <div class="spacing-h-115" />

    <HomeExplorerCards></HomeExplorerCards>

    <div class="spacing-h-115" />

    <BaseMarqueeText
      :repeat="100"
      :paused="isPaused"
      class="mt-2 py-2"
      @mouseenter="isPaused = !isPaused"
      @mouseleave="isPaused = false"
    >
      <span class="fewAndFarColor text-2xl font-extrabold md:text-3xl">
        {{ 'FewAndFar'.repeat(4) }}
      </span>
    </BaseMarqueeText>

    <div class="spacing-h-115" />

    <HomeFeaturedCollection></HomeFeaturedCollection>

    <div class="spacing-h-115" />

    <HomeCollectionStats collection-type="popular" :filter-stats="true">
      {{ $t('home.collections.popular') }}
    </HomeCollectionStats>

    <HomeCollectionStats collection-type="latest">
      {{ $t('home.collections.latest') }}
    </HomeCollectionStats>

    <HomeCollectionStats collection-type="upcoming">
      {{ $t('home.collections.upcoming') }}
    </HomeCollectionStats>

    <HomeCollectionStats collection-type="highest-sales" :filter-stats="true">
      {{ $t('home.collections.highest') }}
    </HomeCollectionStats>

    <div class="spacing-h-135" />

    <BaseMarqueeText
      :repeat="100"
      :paused="isPaused"
      class="mt-2 py-2"
      @mouseenter="isPaused = !isPaused"
      @mouseleave="isPaused = false"
    >
      <span class="fewAndFarColor text-2xl font-extrabold md:text-3xl">
        {{ 'FewAndFar'.repeat(4) }}
      </span>
    </BaseMarqueeText>

    <div class="spacing-h-115" />

    <HomeEarnUpSection></HomeEarnUpSection>

    <HomePreFooterSection></HomePreFooterSection>
  </div>
</template>

<script>
import { defineComponent } from '#imports'

export default defineComponent({
  setup() {
    const isPaused = ref(false)
    return {
      isPaused,
    }
  },
})
</script>
