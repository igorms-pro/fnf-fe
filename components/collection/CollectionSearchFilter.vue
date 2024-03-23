<template>
  <div
    v-if="initialTraits.length >= 5"
    :class="[
      isInputFocus
        ? 'border-purple'
        : 'border-transparent hover:border-purple dark:border-grey-300 dark:hover:border-purple',
      'group relative mx-4 mb-5 mt-6 flex h-11 justify-between rounded-lg border border-grey-light2',
    ]"
  >
    <div class="dark-mode flex rounded-l-lg bg-white">
      <button class="mx-3 flex items-center justify-center" type="button">
        <IconSearch />
      </button>
    </div>
    <input
      v-model="searchInput"
      :placeholder="$t('search.filter')"
      class="dark-mode block h-full w-full rounded-r-lg border-none py-2 pr-2 focus:outline-none"
      @focus="isInputFocus = true"
      @blur="isInputFocus = false"
    />
    <div v-if="searchInput" class="dark-mode flex rounded-r-lg bg-white">
      <button
        class="mx-3 flex items-center justify-center hover:text-purple"
        type="button"
        @click="clearSearchInput"
      >
        <IconClose />
      </button>
    </div>
  </div>
  <TransitionGroup
    name="list"
    tag="ul"
    :class="[{ 'mt-5': initialTraits.length <= 5 }, 'w-full']"
  >
    <li
      v-for="trait in traits"
      :key="trait"
      class="relative flex w-full cursor-pointer select-none items-center px-4 text-base font-medium hover:bg-grey-light3 hover:text-purple dark:hover:bg-black/40"
    >
      <input
        :id="trait.trait_value"
        :name="trait.trait_value"
        type="checkbox"
        class="form-checkbox mr-2.5 h-6 w-6 cursor-pointer rounded text-purple dark:bg-dark dark:checked:bg-purple"
        :checked="isEnabled(traitType, trait.trait_value)"
        @change="onChangeAttr(traitType, trait.trait_value, $event)"
      />
      <label class="w-full cursor-pointer py-2" :for="trait.trait_value">
        {{ trait.trait_value }}
      </label>
    </li>
  </TransitionGroup>
</template>
<script>
import { useDebounceFn } from '@vueuse/core'
import { defineComponent } from '#imports'

import IconSearch from '~/assets/images/icons/search-icon.svg?component'
import IconClose from '~/assets/images/icons/close.svg?component'

export default defineComponent({
  components: {
    IconSearch,
    IconClose,
  },
  props: {
    initialTraits: {
      type: Array,
      required: true,
    },
    traitType: {
      type: String,
      required: true,
    },
  },

  emits: ['filterSidePanelToggle'],

  setup(props) {
    const TIMEOUT = 300
    const isInputFocus = ref(false)
    const searchInput = ref()
    const traits = ref(props.initialTraits)

    const { attributes: selectedAttributes, changeAttribute } =
      useCollectionAttributes()

    const onChangeAttr = (traitType, traitValue, event) => {
      const isEnabled = event.srcElement.checked
      changeAttribute(traitType, traitValue, isEnabled)
    }
    const isEnabled = (traitType, traitValue) => {
      return selectedAttributes.value?.[traitType]?.includes(traitValue)
    }

    const clearSearchInput = () => {
      searchInput.value = ''
      traits.value = props.initialTraits
    }

    const updateCollecitons = useDebounceFn(() => {
      if (searchInput.value) {
        traits.value = props.initialTraits.filter(
          (item) =>
            item.trait_value.toLowerCase().match(searchInput.value) ||
            item.trait_value.match(searchInput.value)
        )
      } else {
        traits.value = props.initialTraits
      }
    }, TIMEOUT)

    watch(searchInput, updateCollecitons)

    return {
      isInputFocus,
      searchInput,
      traits,

      clearSearchInput,
      onChangeAttr,
      isEnabled,
    }
  },
})
</script>
