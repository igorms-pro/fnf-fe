<template>
  <h2 class="px-16 text-center text-3xl font-extrabold lg:text-5xl">
    {{ $t('welcomeTerraLuna.storyTitle') }}
  </h2>
  <p class="mt-6 mb-16 text-center text-base lg:mb-28 lg:px-44">
    {{ $t('welcomeTerraLuna.storyDescription') }}
  </p>
  <div
    class="space-y-20 lg:flex lg:flex-row lg:justify-center lg:space-x-20 lg:space-y-0"
  >
    <div v-for="{ name, desc, media, twitter } in founders" :key="name">
      <div
        class="shadow-box animate-up-hover mx-auto flex h-60 w-60 flex-col rounded-3xl border-b-2 border-grey-200 bg-gradient-to-b from-purple to-white text-center lg:h-72 lg:w-72"
      >
        <img
          :src="media"
          class="relative -top-7 mx-auto h-72 w-4/6 lg:-top-8 lg:h-80"
        />
      </div>
      <div class="mt-5 text-center">
        <p class="mb-1.5 text-xl font-semibold">{{ name }}</p>
        <p class="mb-2 text-center">
          {{ desc }}
        </p>
        <a
          :href="`https://twitter.com/${twitter}`"
          class="flex items-center justify-center font-semibold text-purple"
        >
          <IconTwitter class="mr-1" />{{ twitter }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import IconTwitter from '~/assets/images/icons/socials/twitter.svg?component'
import TajAvatar from '~/assets/images/terra-luna/avatars/tajAvatar.png'
import CrisAvatar from '~/assets/images/terra-luna/avatars/crisAvatar.png'
import ChrisAvatar from '~/assets/images/terra-luna/avatars/chrisAvatar.png'

export default {
  components: {
    IconTwitter,
  },
  setup() {
    const founders = [
      {
        name: 'DrifTTer',
        desc: 'Co-Founder & Head of Design',
        media: TajAvatar,
        twitter: '@drifTTer_near',
      },
      {
        name: 'Edge',
        desc: 'Co-Founder & Head of Ops',
        media: CrisAvatar,
        twitter: '@heyw00dc',
      },
      {
        name: 'Chris Hayes',
        desc: 'Co-Founder & CTO',
        media: ChrisAvatar,
        twitter: '@hayesdata',
      },
    ]

    const imageLoadError = (event) => {
      event.target.src = 'assets/images/no-items.svg'
    }

    return {
      founders,

      imageLoadError,
    }
  },
}
</script>
