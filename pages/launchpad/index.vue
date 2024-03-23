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

    <LaunchpadHero />
  </div>
</template>
