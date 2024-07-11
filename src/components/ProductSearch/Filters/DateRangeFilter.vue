<template>
  <div class="date-range-filter">
    <div class="year-display">
      <span>{{ fromYear }}</span>
      <span>-</span>
      <span>{{ toYear }}</span>
    </div>
    <div class="slider-container">
      <div class="slider-track"></div>
      <div class="slider-range" :style="rangeStyle"></div>
      <input
        type="range"
        :min="filter.min"
        :max="filter.max"
        v-model.number="fromYear"
        @input="updateFromYear"
        class="slider from-slider"
      />
      <input
        type="range"
        :min="filter.min"
        :max="filter.max"
        v-model.number="toYear"
        @input="updateToYear"
        class="slider to-slider"
      />
    </div>
    <div class="year-inputs">
      <input
        type="number"
        v-model.number="fromYear"
        @input="updateFromYear"
        :min="filter.min"
        :max="toYear - 1"
      />
      <input
        type="number"
        v-model.number="toYear"
        @input="updateToYear"
        :min="fromYear + 1"
        :max="filter.max"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'DateRangeFilter',
  props: ['filter', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const fromYear = ref(props.modelValue?.[0] ?? props.filter.min)
    const toYear = ref(props.modelValue?.[1] ?? props.filter.max)

    const updateFromYear = () => {
      if (fromYear.value >= toYear.value) {
        fromYear.value = toYear.value - 1
      }
      emit('update:modelValue', [fromYear.value, toYear.value])
    }

    const updateToYear = () => {
      if (toYear.value <= fromYear.value) {
        toYear.value = fromYear.value + 1
      }
      emit('update:modelValue', [fromYear.value, toYear.value])
    }

    const rangeStyle = computed(() => {
      const left =
        ((fromYear.value - props.filter.min) / (props.filter.max - props.filter.min)) * 100
      const right =
        100 - ((toYear.value - props.filter.min) / (props.filter.max - props.filter.min)) * 100
      return {
        left: `${left}%`,
        right: `${right}%`
      }
    })

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          fromYear.value = newValue[0]
          toYear.value = newValue[1]
        }
      }
    )

    return { fromYear, toYear, updateFromYear, updateToYear, rangeStyle }
  }
})
</script>

<style scoped>
.date-range-filter {
  padding: 20px;
  background: #f0f4f8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.year-display {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 40px;
}

.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background: #cbd5e0;
  border-radius: 2px;
}

.slider-range {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  background: #4299e1;
  border-radius: 2px;
}

.slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  pointer-events: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4299e1;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.3);
  pointer-events: auto;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4299e1;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.3);
  pointer-events: auto;
}

.year-inputs {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.year-inputs input {
  width: 80px;
  padding: 5px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
}
</style>
