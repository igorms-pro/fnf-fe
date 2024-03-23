<template>
  <div
    class="my-4 rounded-lg border border-grey-light2 p-4 dark:border-grey-300"
  >
    <p class="mb-3 text-xs text-grey-200">
      {{ $t('itemDetail.section.currentPrice') }}
    </p>
    <LogoNear logo-class-name="!h-3.5 !w-3.5">
      <img src="~/assets/images/icons/tag.svg" class="mr-2 hidden lg:block" />
      <span class="font-semibold">{{ price }} </span>
    </LogoNear>

    <div class="mt-4 flex space-x-2 lg:hidden">
      <BaseButton class="w-1/2" border type="primary">
        {{ $t('itemDetail.action.buyNow') }}
      </BaseButton>
      <BaseButton class="w-1/2" border type="custom">
        {{ $t('itemDetail.action.makeOffer') }}
      </BaseButton>
    </div>
    <p
      class="mt-3 text-xs text-grey-300 dark:text-grey-light2"
      v-html="
        $t('itemDetail.action.termOfService', {
          firstActionBtn: $t('itemDetail.action.buyNow'),
          secondActionBtn: $t('itemDetail.action.makeOffer'),
        })
      "
    ></p>
  </div>
</template>

<script>
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
    price: {
      type: String,
      required: true,
    },
  },
})
</script>
