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
export default {
  name: 'DateRangeFilter',
  props: ['filter', 'modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      fromYear: this.modelValue?.[0] ?? this.filter.min,
      toYear: this.modelValue?.[1] ?? this.filter.max
    }
  },
  computed: {
    rangeStyle() {
      const left = ((this.fromYear - this.filter.min) / (this.filter.max - this.filter.min)) * 100
      const right =
        100 - ((this.toYear - this.filter.min) / (this.filter.max - this.filter.min)) * 100
      return {
        left: `${left}%`,
        right: `${right}%`
      }
    }
  },
  methods: {
    updateFromYear() {
      if (this.fromYear >= this.toYear) {
        this.fromYear = this.toYear - 1
      }
      this.$emit('update:modelValue', [this.fromYear, this.toYear])
    },
    updateToYear() {
      if (this.toYear <= this.fromYear) {
        this.toYear = this.fromYear + 1
      }
      this.$emit('update:modelValue', [this.fromYear, this.toYear])
    }
  },
  watch: {
    modelValue: {
      handler(newValue) {
        if (newValue) {
          this.fromYear = newValue[0]
          this.toYear = newValue[1]
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
/* The CSS remains the same as in your original component */
</style>
