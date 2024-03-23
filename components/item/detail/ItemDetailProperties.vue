<template>
  <ItemDetailSectionCard>
    <template #content-title>
      <IconProperties class="mr-2 h-5 w-5" />
      <p class="font-semibold">
        {{ $t('itemDetail.section.properties') }}
      </p>
    </template>

    <template #content-section>
      <hr
        class="border-px -mt-4 mb-7 w-full border-grey-light2 dark:border-grey-300"
      />
      <div class="grid grid-cols-2 gap-3 md:grid-cols-3">
        <div
          v-for="(
            { traitType, value, rarityValue, rarityText }, index
          ) in itemAttributes"
          :key="`${traitType}_${index}`"
          class="mb-4 dark:border-grey-300 md:border-r-0"
          :class="{
            'border-r border-grey-150': index % 2 === 0,
            'md:border-l md:border-grey-150 md:pl-4': index % 3 !== 0,
          }"
        >
          <p class="text-sm font-medium text-grey-200 dark:text-grey-light2">
            {{ traitType }}
          </p>
          <p class="dark-mode text-base font-medium">
            {{ value }}
          </p>
          <p class="text-sm font-semibold text-purple">
            {{ rarityValue ? `${rarityValue}${rarityText}` : '' }}
          </p>
        </div>
      </div>
    </template>
  </ItemDetailSectionCard>
</template>

<script>
import i18n from 'i18next'
import { defineComponent } from '#imports'
import IconProperties from '~/assets/images/icons/properties.svg?component'

export default defineComponent({
  components: {
    IconProperties,
  },
  props: {
    attributes: {
      type: Array,
      required: true,
    },
    collectionAttributes: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const itemAttributes = ref([])

    // TODO to much map & find. BE v2 need to update
    itemAttributes.value = props.attributes.map((nftattItem) => {
      const matchedAttributes = props.collectionAttributes.find(
        (attr) => attr.trait_type === nftattItem.trait_type
      )

      if (matchedAttributes) {
        const trait = matchedAttributes.unique_values.find(
          (attr) => attr.trait_value === nftattItem.value
        )

        return {
          traitType: nftattItem.trait_type,
          value: nftattItem.value,
          rarityValue:
            trait.rarity < 1
              ? trait.rarity.toFixed(2)
              : trait.rarity.toFixed(0),
          rarityText: i18n.t('itemDetail.haveThisTrait'),
        }
      }

      // if failed
      return {
        traitType: nftattItem.trait_type,
        value: nftattItem.value,
        rarity: null,
      }
    })

    return { itemAttributes }
  },
})
</script>
