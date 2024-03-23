<template>
  <div
    class="dark-mode dark-mode-duration m-1 rounded-lg border-2 border-purple bg-white py-2 px-4 text-sm hover:bg-purple hover:text-white lg:py-1.5 lg:text-base"
  >
    <div class="flex items-center justify-between whitespace-nowrap capitalize">
      <IconClose class="mr-2.5"></IconClose>
      <slot />
    </div>
  </div>
</template>

<script setup>
import IconClose from '~/assets/images/icons/close.svg?component'
</script>
