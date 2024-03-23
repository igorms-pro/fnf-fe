<template>
  <section
    v-if="collections && collections.length > 0"
    id="featureCollection"
    class="container"
  >
    <swiper
      :autoplay="{
        delay: 5000,
      }"
      :space-between="50"
      :pagination="{ clickable: true }"
      :modules="modules"
    >
      <template v-if="pending">
        <swiper-slide>
          <LoaderSkeletonFeatureCard />
        </swiper-slide>
      </template>
      <template v-else>
        <swiper-slide
          v-for="{
            collectionId,
            collectionName,
            description,
            media,
            media256,
            media512,
            media1024,
          } in collections"
          :key="collectionId"
        >
          <div class="md:grid md:grid-cols-2 md:gap-x-5">
            <div
              class="flex flex-col items-center justify-center md:items-start md:justify-end md:pr-28"
            >
              <h2 class="mb-2 text-base font-semibold text-purple md:text-lg">
                {{ $t('home.featured.title') }}
              </h2>
              <p class="main-title mb-4">
                {{ collectionName }}
              </p>
            </div>
            <div class="ml-auto md:row-span-2">
              <BaseImg
                :media="media"
                :alt="collectionName"
                class="mx-auto h-60 w-60 rounded-3xl object-cover shadow-md drop-shadow-sm md:h-96 md:w-96 lg:h-[546px] lg:w-[546px]"
                :img-set="
                  createImageSet({
                    256: media256,
                    512: media512,
                    1024: media1024,
                  })
                "
              />
            </div>
            <div class="flex flex-col items-center md:items-start md:pr-28">
              <p
                class="mx-8 mt-6 text-center text-sm leading-6 text-grey-300 dark:text-grey-light2 md:mx-0 md:text-left md:text-base"
              >
                {{ description }}
              </p>
              <nuxt-link
                :to="{ name: 'collection-id', params: { id: collectionId } }"
                class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-center btn-xl mx-auto mt-4 mb-10 block font-bold capitalize md:mx-0 md:mt-7"
              >
                {{ $t('home.explore.action.exploreCollection') }}
              </nuxt-link>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import utils from '~/utils'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const { $useFetch } = useNuxtApp()
    const { data, pending } = $useFetch(`/collection/featured`)

    const collections = computed(() => data.value)
    return {
      modules: [Autoplay, Pagination],
      collections,
      pending,
      createImageSet: utils.createImageSet,
    }
  },
}
</script>
<style>
#featureCollection .swiper {
  padding-bottom: 40px;
}
@media only screen and (max-width: 767px) {
  #featureCollection .swiper-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
  }
}
#featureCollection .swiper-pagination {
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto !important;
}
#featureCollection .swiper-pagination-bullet {
  width: 60px;
  height: 4px;
  border-radius: 0;
  background: theme('colors.purple.light');
}
#featureCollection .swiper-pagination-bullet-active {
  background: theme('colors.purple.DEFAULT');
}
</style>
