<template>
  <div
    :class="[
      'my-4 flex w-full cursor-pointer flex-wrap items-center justify-between rounded-lg border py-3 px-1 hover:border-purple  hover:outline-none focus:outline-none md:mr-3',
      {
        'border-red hover:border-red focus:border-red': hasError,
        'border-grey-140 dark:border-grey-300': !isInputActive && !hasError,
      },
      isInputActive && hasError
        ? 'border-red hover:border-red focus:border-red'
        : 'border-purple',
    ]"
    @click="focusInput()"
  >
    <div
      :class="[
        'flex flex-wrap items-center',
        {
          'text-grey-200': !inputValue,
        },
      ]"
    >
      <input
        ref="refInput"
        v-model="inputValue"
        :class="[
          'dark-mode appearance-none break-words break-all border-0 text-lg outline-none focus:appearance-none focus:border-0 focus:outline-none focus:ring-0 md:min-w-[90px] md:text-2xl',
          {
            'md:min-w-[60px]': !inputValue,
          },
        ]"
        type="number"
        placeholder="0.0"
        :style="{ width: `${inputWidth}ch` }"
        @focus="isInputActive = true"
        @blur="isInputActive = false"
        @keypress="handleNumericInput"
        @keydown="handleWidth"
      />

      <span class="mr-1 ml-2 text-lg md:ml-0 md:text-2xl"> {{ unit }}</span>
    </div>
    <button
      class="btn btn-primary btn-border-primary btn-sm ml-2 rounded-full border-2 md:mr-3 md:ml-0"
      @click="updateInputValueToMax"
    >
      {{ $t('rewards.action.stakeAll') }}
    </button>
  </div>
  <span v-if="hasError" class="text-xs text-red md:absolute md:bottom-3">
    {{ $t('error.notEnoughBalance') }}
  </span>
</template>

<script>
import { defineComponent, onMounted, ref } from '#imports'

export default defineComponent({
  props: {
    inputValueMax: {
      type: String,
      require: true,
    },
    unit: {
      type: String,
      require: true,
    },
  },
  emits: ['update-value'],

  setup(props, { emit }) {
    const inputValue = ref(0)
    const refInput = ref(null)
    const hasError = ref(false)
    const isInputActive = ref(false)
    const QUADRILLION_MAX_LENGTH = 16
    const inputWidth = ref(null)

    const focusInput = () => {
      refInput.value.focus()
      isInputActive.value = true
    }

    const updateInputValueToMax = (e) => {
      inputValue.value = props.inputValueMax
      hasError.value = false
      inputWidth.value = props.inputValueMax.length + 3
    }

    const handleWidth = (e) => {
      inputWidth.value = e.target.value.length + 3
    }

    onMounted(() => {
      if (inputValue.value === 0) {
        inputValue.value = ''
        inputWidth.value = 5
      }
    })

    const updateValue = () => {
      emit('update-value', hasError.value ? null : inputValue.value)
    }
    // TODO - ADD to HELPERS
    const handleNumericInput = (e) => {
      if (['-', '+', 'e', 'E', "'"].includes(e.key)) e.preventDefault()
    }

    watch(
      () => inputValue.value,
      (newValue, prevValue) => {
        if (newValue.toString().length > QUADRILLION_MAX_LENGTH) {
          inputValue.value = prevValue
        }
        hasError.value = inputValue.value > props.inputValueMax
        updateValue()
      }
    )

    return {
      inputValue,
      refInput,
      hasError,
      isInputActive,
      QUADRILLION_MAX_LENGTH,
      inputWidth,

      focusInput,
      updateInputValueToMax,
      handleNumericInput,
      handleWidth,
    }
  },
})
</script>
