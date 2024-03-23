<template>
  <div
    class="shadow-box dark-mode flex items-center space-x-3 bg-white py-6 px-2 dark:border dark:border-grey-300 dark:shadow-none md:p-4"
  >
    <slot name="img" />
    <div class="block">
      <span class="text-2xl font-extrabold md:text-3xl"
        ><slot name="title" />
      </span>
      <span
        class="mt-3 block text-base text-grey-300 dark:text-grey-light2 md:text-lg"
      >
        <slot name="description" />
      </span>
    </div>
  </div>
</template>
