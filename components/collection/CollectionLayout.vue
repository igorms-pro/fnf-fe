<template>
  <div
    :class="[
      isFilterSidePanelOpen ? ' lg:pr-8' : 'lg:px-8',
      'relative w-full border-l border-grey-light transition-all duration-700 ease-in-out dark:border-grey-300',
    ]"
  >
    <div class="container">
      <slot name="toolbar" />
      <slot name="layout" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '#imports'

export default defineComponent({
  props: {
    isFilterSidePanelOpen: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
