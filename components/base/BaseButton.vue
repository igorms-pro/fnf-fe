<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      border ? 'border-b-4' : '',
      getType,
      className ? className : getSize,
      radius,
      iconLeft ? 'h-11 md:h-12' : '',
      'btn-text-size cursor-pointer whitespace-nowrap',
    ]"
    v-bind="$attrs"
  >
    <div
      :class="[
        iconRight ? 'flex-row-reverse' : '',
        iconLeft ? 'pr-2' : '',
        'flex items-center whitespace-nowrap',
        type === 'custom2' ? 'w-full justify-between' : 'justify-center',
      ]"
    >
      <img
        v-if="icon"
        :src="icon"
        alt="icon"
        :class="[
          $slots.default ? 'mx-2' : '',
          iconLeft ? 'mx-1 md:mx-2' : '',
          size === 'large' ? '-my-3 md:-my-3.5' : '',
          size === 'base' ? '-my-2 md:-my-3' : '',
          size === 'iconSmall' ? 'h-3 w-3' : '',
          size === 'iconBase' ? 'h-4 w-4' : '',
          size === 'iconLarge' ? 'h-6 w-6' : '',
          '',
        ]"
      />
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    radius: {
      type: String,
      default: 'rounded-lg',
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'base',
    },
    border: {
      type: Boolean,
      default: false,
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getType() {
      const type = {
        primary: 'primary-color',
        secondary: 'secondary-color',
        custom: [
          this.border ? 'border-x-2 border-t-2 border-b-4' : 'border-2',
          'few-and-far-color hover:few-and-far-color',
        ],
        custom2: [
          this.border ? 'border-x-2 border-t-2 border-b-4' : 'border-2',
          'few-and-far-color-2 hover:few-and-far-color',
        ],
        grey: [
          'border-2 hover:border-purple active:bg-grey-light3 active:border-transparent bg-white border-transparent shadow-box',
        ],
        white: [
          this.icon && !this.$slots.default
            ? 'border-2 hover:border-purple active:bg-grey-light3 active:border-transparent'
            : 'hover:text-purple active:bg-purple active:border-purple active:text-white',
          'bg-white border-transparent shadow-box border ',
        ],
        transparent: 'bg-transparent',
        multiple: 'primary-color rounded-full b-multi-size',
        multipleText: 'b-multi-size text-grey-400',
      }
      return type[this.type] || type.primary
    },
    getSize() {
      const size = {
        small: 'size-small',
        base: 'size-base',
        connect: 'text-[15px] px-5 h-10',
        iconBase: 'icon-size-base',
        iconLarge: 'icon-size-large',
        large: 'size-large',
      }
      return size[this.size] || size.base
    },
  },
}
</script>
<style scoped lang="postcss">
.btn-text-size {
  @apply font-bold transition duration-150 ease-in-out focus:outline-none;
}
.primary-color {
  @apply border-purple-dark bg-purple text-white hover:border-blue-dark hover:bg-blue active:border-blue-dark active:bg-blue;
}
.secondary-color {
  @apply border-black bg-grey-300 text-white hover:border-purple-secondary hover:bg-purple-dark active:border-purple-secondary active:bg-purple-dark;
}
.few-and-far-color {
  @apply border-transparent text-purple;
  background-clip: padding-box, border-box !important;
  background-origin: padding-box, border-box !important;
  background: linear-gradient(to right, #fff, #fff, #fff),
    linear-gradient(
      to bottom right,
      theme('colors.purple.DEFAULT'),
      theme('colors.blue.DEFAULT'),
      theme('colors.green.DEFAULT')
    );
}

.few-and-far-color-2 {
  @apply border-transparent text-black;
  background-clip: padding-box, border-box !important;
  background-origin: padding-box, border-box !important;
  background: linear-gradient(to right, #fff, #fff, #fff),
    linear-gradient(
      to bottom right,
      theme('colors.purple.DEFAULT'),
      theme('colors.purple.DEFAULT'),
      theme('colors.purple.DEFAULT')
    );
}
.few-and-far-color:hover,
.few-and-far-color-2:hover {
  @apply border-transparent text-purple hover:text-blue;
  background-clip: padding-box, border-box !important;
  background-origin: padding-box, border-box !important;
  background: linear-gradient(to right, #fff, #fff, #fff),
    linear-gradient(
      to bottom right,
      theme('colors.blue.DEFAULT'),
      theme('colors.blue.DEFAULT'),
      theme('colors.blue.DEFAULT')
    );
}

.size-small {
  @apply px-3 py-2 text-xs;
}
.size-base {
  @apply px-5 py-2 text-sm md:py-3 md:text-base;
}
.size-large {
  @apply px-6 py-3 text-[15px] md:px-7 md:py-3.5 md:text-base;
}
.icon-size-base {
  @apply h-10 w-10 p-0;
}
.icon-size-large {
  @apply h-12 w-12 p-0;
}
.b-multi-size {
  @apply mx-5 px-4 py-1.5;
}
.b-multi-size:first-child,
.b-multi-size:last-child {
  @apply mx-0 px-4;
}
</style>
