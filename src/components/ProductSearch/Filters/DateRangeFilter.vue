<!-- DateRangeFilter.vue -->
<template>
  <div>
    <input
      type="number"
      :min="filter.min"
      :max="filter.max"
      v-model.number="localMin"
      @input="debouncedUpdateValues"
    />
    <input
      type="number"
      :min="filter.min"
      :max="filter.max"
      v-model.number="localMax"
      @input="debouncedUpdateValues"
    />
    <div>From: {{ localMin }}, To: {{ localMax }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { debounce } from '@/utils/debounce'

const props = defineProps<{
  filter: {
    min: number
    max: number
    selected: [number, number]
  }
}>()

const emit = defineEmits(['update:modelValue'])

const localMin = ref(props.filter.selected[0])
const localMax = ref(props.filter.selected[1])

const updateValues = () => {
  emit('update:modelValue', [localMin.value, localMax.value])
}

const debouncedUpdateValues = debounce(updateValues, 300) // 300ms debounce

watch(
  () => props.filter.selected,
  (newValue) => {
    localMin.value = newValue[0]
    localMax.value = newValue[1]
  },
  { deep: true }
)

onMounted(() => {
  // Initialize local values
  localMin.value = props.filter.selected[0]
  localMax.value = props.filter.selected[1]
})
</script>
