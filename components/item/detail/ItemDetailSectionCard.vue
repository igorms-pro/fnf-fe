<template>
  <Disclosure
    v-slot="{ open, close }"
    :key="isDefaultOpen"
    :default-open="isDefaultOpen"
  >
    <div
      :class="[
        open ? 'bg-white dark:bg-dark' : 'bg-grey-light3 dark:bg-black',
        'rounded-lg border border-grey-light2 dark:border-grey-300',
      ]"
    >
      <DisclosureButton
        as="div"
        class="flex cursor-pointer items-center justify-between rounded-lg py-4 px-5 text-sm md:text-base"
      >
        <div class="flex items-center">
          <slot name="content-title"></slot>
        </div>
        <IconChevrowDown
          :class="open ? 'rotate-180 transform' : ''"
          class="flex items-center justify-center"
        />
      </DisclosureButton>
      <DisclosurePanel
        class="mt-3 rounded-lg bg-white p-4 dark:bg-dark"
        @click="close()"
      >
        <slot name="content-section"></slot>
      </DisclosurePanel>
    </div>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import IconChevrowDown from '~/assets/images/icons/chevron-down.svg?component'
import { defineComponent } from '#imports'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    IconChevrowDown,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    offersCount: {
      type: Number,
    },
  },
  setup(props) {
    const isSectionOpen = ref(props.isOpen)

    watch(props, () => {
      if (props.offersCount > 0) {
        isSectionOpen.value = true
      }
    })

    return {
      isDefaultOpen: computed(() => isSectionOpen.value),
    }
  },
})
</script>
