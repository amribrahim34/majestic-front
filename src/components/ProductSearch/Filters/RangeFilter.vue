<template>
  <div class="range-filter">
    <div class="flex justify-between mb-2">
      <span>${{ displayMin }}</span>
      <span>${{ displayMax }}</span>
    </div>
    <div class="flex items-center">
      <input
        type="range"
        :min="filter.min"
        :max="filter.max"
        v-model.number="minValue"
        @input="updateRange"
        class="w-full"
      />
      <input
        type="range"
        :min="filter.min"
        :max="filter.max"
        v-model.number="maxValue"
        @input="updateRange"
        class="w-full"
      />
    </div>
    <div class="flex justify-between mt-2">
      <input
        type="number"
        v-model.number="minValue"
        @input="updateRange"
        :min="filter.min"
        :max="maxValue"
        class="w-20 px-2 py-1 border rounded"
      />
      <input
        type="number"
        v-model.number="maxValue"
        @input="updateRange"
        :min="minValue"
        :max="filter.max"
        class="w-20 px-2 py-1 border rounded"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  name: 'RangeFilter',
  props: ['filter', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const minValue = ref(props.modelValue?.[0] ?? props.filter.min)
    const maxValue = ref(props.modelValue?.[1] ?? props.filter.max)

    const updateRange = () => {
      // Ensure min doesn't exceed max
      if (minValue.value > maxValue.value) {
        minValue.value = maxValue.value
      }
      emit('update:modelValue', [minValue.value, maxValue.value])
    }

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          minValue.value = newValue[0]
          maxValue.value = newValue[1]
        }
      }
    )

    const displayMin = computed(() => minValue.value.toFixed(2))
    const displayMax = computed(() => maxValue.value.toFixed(2))

    return {
      minValue,
      maxValue,
      updateRange,
      displayMin,
      displayMax
    }
  }
})
</script>

<style scoped>
.range-filter input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}

.range-filter input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: #4a5568;
  cursor: pointer;
  margin-top: -6px;
}

.range-filter input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
}

.range-filter input[type='range']:focus {
  outline: none;
}

.range-filter input[type='range']:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>
