<template>
  <div
    class="shadow-box dark-mode dark-mode-duration border border-transparent bg-white px-3 py-2.5 dark:border-grey-300 lg:px-5 lg:py-5"
  >
    <p class="mb-3 text-xs font-medium text-grey-200 lg:text-sm">
      <slot name="title"></slot>
    </p>
    <p
      v-if="$slots['content-simple']"
      class="flex items-center space-x-2 lg:space-x-3"
    >
      <slot name="content-simple"></slot>
    </p>

    <slot v-if="$slots['content-detailed']" name="content-detailed"></slot>
  </div>
</template>
