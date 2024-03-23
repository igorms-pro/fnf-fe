<template>
  <Responsive class="w-full">
    <template #main="{ width }">
      <Chart
        :size="{ width, height: 250 }"
        :data="priceActivities"
        :margin="margin"
        :direction="direction"
        @click.stop
      >
        <template #layers>
          <Grid stroke-dasharray="2,2" />
          <Line :data-keys="['date', 'price']" />
        </template>
        <template #widgets>
          <Tooltip
            :border-color="isDark ? '#ffffff' : '#1f1f1f'"
            :config="{
              price: { color: '#000000' },
              date: { hide: true },
            }"
          />
        </template>
      </Chart>
    </template>
  </Responsive>
</template>

<script lang="ts">
import { Chart, Grid, Line, Responsive, Tooltip } from 'vue3-charts'
import { defineComponent, ref, useDark } from '#imports'

export default defineComponent({
  name: 'LineChart',
  components: { Chart, Grid, Line, Responsive, Tooltip },
  props: {
    priceActivities: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const direction = ref('horizontal')
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    })
    const { isDark } = useDark()

    return { direction, margin, isDark }
  },
})
</script>
