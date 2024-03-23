<template>
  <div class="animate-pulse">
    <img
      class="mx-auto mt-16"
      src="~/assets/images/icons/loading.svg"
      :alt="$t('profile.sections.loading')"
    />
    <div
      class="dark-mode mx-auto w-full bg-white p-3 text-center text-base font-semibold text-grey-200 lg:mt-6 lg:p-5 lg:text-xl">
      <p>{{ $t('profile.sections.loading') }}</p>
    </div>
  </div>
</template>
