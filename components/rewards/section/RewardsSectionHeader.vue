<template>
  <div>
    <div class="md:flex md:items-center">
      <h1
        class="title text-center font-bold md:mt-0 md:mr-4 md:text-left md:text-6xl"
      >
        <slot name="title" />
      </h1>
    </div>
    <div>
      <div class="items-center md:mt-3 md:mb-7 md:flex md:justify-between">
        <p
          class="my-3 text-center text-sm text-grey-300 dark:text-grey-light2 md:text-left md:text-base"
        >
          <slot name="subtitle" />
        </p>
      </div>
    </div>
  </div>
</template>
