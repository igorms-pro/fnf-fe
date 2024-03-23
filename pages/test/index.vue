<template>
  <div class="shadow-gray-600 sm p-10 shadow-md">
    <div class="mx-auto mb-4 grid w-1/2 grid-cols-1 gap-4">
      <h2 class="col-span-1 text-xl font-semibold">BaseButton</h2>
      <button class="btn btn-primary btn-border-primary btn-sm border-2">
        Button SM
      </button>
      <button class="btn btn-secondary btn-border-secondary btn-base border-2">
        Button Base
      </button>
      <button
        class="btn btn-primary btn-border-primary btn-border-b-primary btn-border-b btn-lg"
      >
        Button LG
      </button>
      <button
        class="btn btn-secondary btn-border-secondary btn-border-b-secondary btn-xl"
      >
        Button XL
      </button>
      <button class="btn btn-brand btn-border-b btn-base border-2 border-b-4">
        Button
      </button>
      <button class="btn btn-brand btn-base border-2">Button</button>
      <!-- start icons  -->
      <button
        class="btn-rounded btn-icon-base shadow-box btn-border-purple border-2"
      >
        <img src="~/assets/images/icons/socials/discord.svg" alt="" />
      </button>
      <button
        class="btn-rounded btn-icon-base shadow-box btn-border-primary btn-primary btn-border-b-primar"
      >
        <img src="~/assets/images/icons/socials/discord.svg" alt="" />
      </button>
      <button
        class="btn-rounded btn-icon-base shadow-box btn-primary btn-border-b-rounded border-b-purple-dark"
      >
        <img src="~/assets/images/icons/socials/discord.svg" alt="" />
      </button>
      <button
        class="btn-rounded btn-icon-lg shadow-box btn-primary btn-border-b-rounded btn-border-primary-dark border-b-4"
      >
        <img src="~/assets/images/icons/socials/discord.svg" alt="" />
      </button>
      <!-- end icons -->
      <button class="btn-primary btn btn-base w-1/3 truncate">
        Accept Highest Offer
      </button>
      <button class="btn btn-base shadow-box btn-between w-1/3">
        <span class="mr-1 truncate">Accept Highest Offer</span>
        <img src="~/assets/images/icons/triangle.svg" alt="" />
      </button>
      <button
        class="btn btn-base shadow-box btn-between btn-border-purple w-1/3 border-2"
      >
        <span></span>
        <span class="mr-1 truncate">Accept Highest Offer</span>
        <img src="~/assets/images/icons/triangle.svg" alt="" />
      </button>
      <button
        class="btn-base shadow-box btn-center btn btn-border-purple border-2"
      >
        <div class="btn-between">
          <img src="~/assets/images/icons/fnf/logo.svg" alt="" />
          <span class="mx-1 truncate">Accept Highest Offer</span>
          <img src="~/assets/images/icons/fnf/logo.svg" alt="" />
        </div>
      </button>
      <button class="btn-fnf-2 btn-base">Hello</button>
      <button class="btn-fnf-2 btn-base btn-between w-1/3">
        <span></span>
        <span class="mr-1 truncate">Accept Highest Offer</span>
        <div>
          <span>123</span>
          Ⓝ
        </div>
      </button>
    </div>
  </div>
</template>
