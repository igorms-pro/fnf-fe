<template>
  <ItemDetailSectionCard>
    <template #content-title>
      <IconAbout class="mr-2 h-4 w-4" />
      <p class="font-semibold">
        {{ $t('itemDetail.section.about') }} {{ collectionName }}
      </p>
    </template>
    <template #content-section>
      <p class="text-grey-300 dark:text-grey-light2">
        {{ collectionDescription }}
      </p>
    </template>
  </ItemDetailSectionCard>
</template>
<script>
import { defineComponent } from '#imports'
import IconAbout from '~/assets/images/icons/about.svg?component'

export default defineComponent({
  components: {
    IconAbout,
  },
  props: {
    collectionName: {
      type: String,
      required: true,
    },
    collectionDescription: {
      type: String,
      required: true,
    },
  },
})
</script>
