<template>
  <button
    class="shadow-box transition-color dark-mode flex h-full w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-lg border-2 border-transparent bg-white px-3.5 py-2.5 duration-150 ease-in-out hover:border-purple active:border-purple dark:border-grey-300 dark:hover:border-purple"
  >
    <div
      class="flex items-center justify-between text-sm font-semibold lg:text-base"
    >
      <IconFilter class="mr-2.5"></IconFilter>
      {{ $t('collection.filters.title') }}
    </div>
    <IconTriangle></IconTriangle>
  </button>
</template>

<script setup>
import IconFilter from '~/assets/images/icons/filter.svg?component'
import IconTriangle from '~/assets/images/icons/triangle.svg?component'
</script>
