<template>
  <div
    class="shadow-box relative my-4 p-6 dark:border dark:border-grey-300 dark:shadow-none md:min-h-[160px]"
  >
    <div class="md:flex md:w-full md:items-center md:justify-between">
      <slot name="content-main" />
      <div class="mt-5 md:mt-8">
        <slot name="contain-main-button" />
      </div>
    </div>
  </div>
</template>
