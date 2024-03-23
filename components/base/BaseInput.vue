<template>
  <div>
    <label
      v-if="labelId && labelTitle"
      :for="labelId"
      class="text-gray-700 block text-sm font-medium leading-5"
      >{{ labelTitle }}</label
    >
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :id="labelId"
        :class="[
          `focus:shadow-outline-${color}`,
          `focus:border-${color}-300`,
          className,
        ]"
        class="text-primary-1 form-input block w-full sm:text-sm sm:leading-5"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    labelId: {
      type: String,
      required: false,
      default: '',
    },
    labelTitle: {
      type: String,
      required: false,
      default: '',
    },
    className: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      default: 'blue',
    },
  },

  emits: ['update:modelValue'],
}
</script>
