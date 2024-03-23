<template>
  <section :class="{ 'spacing-h-88': collections?.length > 0 }">
    <div
      :class="[
        collections?.length > 0 ? 'mb-7 md:mb-10' : '',
        'container flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0',
      ]"
    >
      <h3
        v-if="!pending && collections?.length > 0"
        class="text-2xl font-extrabold md:text-3xl"
      >
        <slot />
      </h3>

      <BaseRadioGroup
        v-if="!pending && filterStats && collections?.length > 0"
        v-model:value="radioSelected"
        :items="multipleData"
        :name="collectionType"
      ></BaseRadioGroup>
    </div>
    <div class="pl-5 md:px-5">
      <swiper
        class="customSwiper 2xl:container"
        :mousewheel="true"
        :slides-per-view="2"
        :space-between="10"
        :navigation="isMdSize"
        :grab-cursor="true"
        :modules="modules"
        :breakpoints="{
          390: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }"
      >
        <template v-if="pending">
          <swiper-slide v-for="i in 12" :key="i">
            <LoaderSkeletonItemCard />
          </swiper-slide>
        </template>
        <template v-else>
          <template v-for="collection in collections" :key="collection._id">
            <swiper-slide class="pt-1">
              <ItemCardCollection
                :id="collection._id"
                :collection-type="collectionType"
                :twitter="collection.socialMedia.twitter"
                :name="collection.collectionName"
                :account-id="collection.collectionId"
                :img="collection.media || collection.icon"
                :is-verified="collection.isVerified"
                class="max-w-52 animate-up-hover"
                :img-set="
                  createImageSet({
                    256: collection.media256,
                    512: collection.media512,
                    1024: collection.media1024,
                  })
                "
              ></ItemCardCollection>
            </swiper-slide>
          </template>
        </template>
      </swiper>
    </div>
  </section>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper'
import i18n from 'i18next'
import { ref, useNuxtApp } from '#imports'
import utils from '~/utils'

import 'swiper/css'
import 'swiper/css/navigation'

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    collectionType: {
      type: String,
      required: true,
    },
    filterStats: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { $fetch } = useNuxtApp()

    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isMdSize = breakpoints.greater('md')

    const radioSelected = ref('1d')
    const multipleData = [
      {
        label: i18n.t('timeDuration.hours', { number: 24 }),
        value: '1d',
      },
      {
        label: i18n.t('timeDuration.days', { number: 7 }),
        value: '7d',
      },
      {
        label: i18n.t('timeDuration.days', { number: 30 }),
        value: '30d',
      },
    ]

    const url = computed(
      () =>
        `/collection/${props.collectionType}?duration=${radioSelected.value}&isVerified=true`
    )

    const { data, pending } = useAsyncData(
      `get-stats-${props.collectionType}`,
      () =>
        $fetch(url.value, {
          method: 'GET',
          refresh: true,
        })
    )

    watch(radioSelected, () =>
      refreshNuxtData(`get-stats-${props.collectionType}`)
    )

    const collections = computed(
      () => data.value?.filter((collection) => !!collection) ?? []
    )

    return {
      collections,
      pending,
      isMdSize,
      modules: [Navigation],
      radioSelected,
      multipleData,
      createImageSet: utils.createImageSet,
    }
  },
})
</script>

<style lang="postcss">
@media only screen and (max-width: 767px) {
  .customSwiper {
    padding: 0 !important;
  }
}
.customSwiper {
  padding: 0 25px;
}
.customSwiper .swiper-button-next.swiper-button-disabled,
.customSwiper .swiper-button-prev.swiper-button-disabled {
  opacity: 0 !important;
}
.customSwiper .swiper-button-next {
  @apply h-[50px] w-[50px];
  margin-top: 0px;
  right: 0;
  background-position: 60%;
  transform: translateY(-100%);
  background-image: url(~/assets/images/icons/chevron-right.svg?url);
}
.customSwiper .swiper-button-prev {
  @apply h-[50px] w-[50px];
  transform: translateY(-100%);
  margin-top: 0px;
  left: 0;
  background-position: 40%;
  background-image: url(~/assets/images/icons/chevron-left.svg?url);
}
.customSwiper .swiper-button-prev,
.customSwiper .swiper-button-next {
  background-repeat: no-repeat;
  background-size: 20px;
  background-color: theme('colors.purple.DEFAULT');
  border-radius: 100%;
  border-bottom: 4px;
  border-style: solid;
  border-color: theme('colors.purple.dark');
}
.customSwiper .swiper-button-next::after,
.customSwiper .swiper-button-prev::after {
  display: none;
}
</style>
