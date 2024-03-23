<template>
  <ItemDetailSectionCard>
    <template #content-title>
      <IconMore class="mr-2 h-5 w-5" />
      <p class="font-semibold">{{ $t('itemDetail.section.more') }}</p></template
    >
    <template #content-section>
      <div class="-mx-2 -mt-10 flex flex-wrap lg:-mx-3">
        <div
          v-for="{ id, contractId, tokenSeriesId, metadata, price } in items"
          :key="id"
          class="mt-6 w-1/2 px-2 sm:w-1/3 lg:w-1/4 lg:px-3 xl:w-1/6"
        >
          <ItemCard
            :id="id"
            :name="metadata.title"
            :media="metadata.media"
            :contract-id="contractId"
            :token-series-id="tokenSeriesId"
            :is-verified="isVerified"
            :price="price.$numberDecimal"
            class="animate-up-hover"
            :img-set="
              createImageSet({
                256: metadata.media256,
                512: metadata.media512,
                1024: metadata.media1024,
              })
            "
          >
            <template #actionButton>{{}}</template>
          </ItemCard>
        </div>
      </div>
    </template>
  </ItemDetailSectionCard>
</template>

<script>
import { defineComponent } from '#imports'
import IconMore from '~/assets/images/icons/more.svg?component'
import utils from '~/utils'

export default defineComponent({
  components: {
    IconMore,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      createImageSet: utils.createImageSet,
    }
  },
})
</script>
