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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RangeFilter',
  props: {
    filter: {
      type: Object,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      minValue: this.modelValue[0] ?? this.filter.min,
      maxValue: this.modelValue[1] ?? this.filter.max
    }
  },
  computed: {
    displayMin() {
      return this.minValue.toFixed(2)
    },
    displayMax() {
      return this.maxValue.toFixed(2)
    }
  },
  methods: {
    updateRange() {
      if (this.minValue > this.maxValue) {
        this.minValue = this.maxValue
      }
      this.$emit('update:modelValue', [this.minValue, this.maxValue])
    }
  },
  watch: {
    modelValue: {
      handler(newValue) {
        if (newValue) {
          this.minValue = newValue[0]
          this.maxValue = newValue[1]
        }
      },
      immediate: true
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
