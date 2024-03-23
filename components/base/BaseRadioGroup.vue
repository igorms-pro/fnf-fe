<template>
  <div
    class="flex max-w-fit flex-row rounded-full border border-grey-100 dark:border-grey-300"
  >
    <div
      v-for="{ label, value: val } in items"
      :key="label"
      class="form-check form-check-inline p-px"
    >
      <input
        :id="`${name}-${val}`"
        :value="value"
        :name="name"
        :checked="value === val"
        type="radio"
        class="peer sr-only"
        @input="$emit('update:value', val)"
      />
      <label
        class="btn btn-sm no-tap-highlight flex cursor-pointer rounded-full hover:text-purple active:bg-purple peer-checked:bg-purple peer-checked:text-white dark:text-grey-light2"
        :for="`${name}-${val}`"
      >
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    items: {
      type: Array,
    },
    name: {
      type: String,
      required: true,
    },
  },

  emits: ['update:value'],
}
</script>
