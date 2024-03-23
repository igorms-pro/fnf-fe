<template>
  <div
    class="dark-mode dark-mode-duration min-h-screen overflow-x-hidden bg-white"
  >
    <section class="relative">
      <TerraHero />
    </section>
    <div class="spacing-h-135"></div>
    <section class="container">
      <TerraCreators />
    </section>
    <div class="spacing-h-135"></div>
    <section class="container">
      <TerraNearProjects />
    </section>
    <div class="spacing-h-88"></div>
    <section class="container">
      <TerraStory />
    </section>
    <div class="spacing-h-135"></div>
    <section class="container">
      <h2
        class="text-center text-2xl font-bold lg:mb-14 lg:text-left lg:text-5xl"
      >
        {{ $t('welcomeTerraLuna.touch') }}
      </h2>
      <div class="mt-8 space-y-2.5 lg:mt-20">
        <div
          v-for="{ title, description, lists, action } in getTouch.slice(0, 3)"
          :key="title"
          class="shadow-box rounded-lg px-6 pt-7 pb-8 lg:flex lg:flex-row lg:p-12"
        >
          <h3 class="text-lg font-bold lg:w-100 lg:pr-20 lg:text-2xl">
            {{ title }}
          </h3>
          <div class="w-full">
            <p class="mt-4 mb-6 text-base">
              {{ description }}
            </p>
            <ul v-if="lists" class="mb-6 list-inside list-disc pl-5">
              <li v-for="line in lists" :key="line">{{ line }}</li>
            </ul>
            <nuxt-link
              :to="action.to"
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg block w-full font-bold lg:w-fit"
            >
              {{ action.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <div class="spacing-h-115"></div>
    <section class="container">
      <TerraPartners />
    </section>
    <div class="spacing-h-135"></div>
    <section class="container lg:flex lg:justify-between">
      <h2
        class="text-center text-2xl font-bold lg:w-72 lg:text-left lg:text-5xl"
      >
        {{ $t('welcomeTerraLuna.touch') }}
      </h2>
      <div class="mt-8 space-y-2.5 lg:mt-0 lg:w-full">
        <div
          v-for="{ title, description, action } in getTouch.slice(3, 6)"
          :key="title"
          class="shadow-box rounded-lg px-6 pt-7 pb-8 lg:flex lg:items-center lg:justify-between lg:p-12"
        >
          <div class="lg:w-2/3">
            <h3 class="text-lg font-bold lg:text-2xl">
              {{ title }}
            </h3>
            <p class="mt-4 mb-6 text-base">{{ description }}</p>
          </div>
          <div class="block lg:w-1/3">
            <nuxt-link
              :to="action.to"
              class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-lg btn-lg w-full"
            >
              {{ action.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <div class="spacing-h-135"></div>
  </div>
</template>

<script>
import i18n from 'i18next'

definePageMeta({
  layout: 'terra-luna',
})

export default {
  setup() {
    const getTouch = [
      {
        title: i18n.t('welcomeTerraLuna.getTouchTitle'),
        description: i18n.t('welcomeTerraLuna.getTouchDescription'),
        action: {
          to: 'https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform',
          name: i18n.t('welcomeTerraLuna.btnListing'),
        },
      },
      {
        title: i18n.t('welcomeTerraLuna.getTouchTitle2'),
        description: i18n.t('welcomeTerraLuna.getTouchDescription2'),
        lists: i18n.t('welcomeTerraLuna.getTouchList2', {
          returnObjects: true,
        }),
        action: {
          to: 'https://docs.google.com/forms/d/e/1FAIpQLScjZMYENKobuyqu5SlbOjz347J8eILzk-VyVoJnyc1pZCuDPw/viewform',
          name: i18n.t('welcomeTerraLuna.btnTerraBridge'),
        },
      },
      {
        title: i18n.t('welcomeTerraLuna.getTouchTitle3'),
        description: i18n.t('welcomeTerraLuna.getTouchDescription3'),
        action: {
          to: 'https://discord.gg/mWYuDzfTPJ',
          name: i18n.t('common.action.btnCommunity'),
        },
      },
      {
        title: i18n.t('welcomeTerraLuna.getTouchTitle4'),
        description: i18n.t('welcomeTerraLuna.getTouchDescription4'),
        action: {
          to: 'https://docs.fewfar.com/',
          name: i18n.t('welcomeTerraLuna.btnWhitepaper'),
        },
      },
      {
        title: i18n.t('welcomeTerraLuna.getTouchTitle5'),
        description: i18n.t('welcomeTerraLuna.getTouchDescription5'),
        action: {
          to: 'https://fewandfar.xyz/',
          name: i18n.t('welcomeTerraLuna.btnWebsite'),
        },
      },
      {
        title: i18n.t('welcomeTerraLuna.getTouchTitle6'),
        description: i18n.t('welcomeTerraLuna.getTouchDescription6'),
        action: {
          to: 'https://discord.fewfar.com/',
          name: i18n.t('welcomeTerraLuna.btnDiscord'),
        },
      },
    ]
    return {
      getTouch,
    }
  },
}
</script>
