<template>
  <div>
    <n-date-picker
      v-model:value="internalSelectedRange"
      type="yearrange"
      clearable
      @update:value="updateRange"
    />
    <div v-if="internalSelectedRange && internalSelectedRange[0] && internalSelectedRange[1]">
      From: {{ formatDate(internalSelectedRange[0]) }}, To:
      {{ formatDate(internalSelectedRange[1]) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { NDatePicker } from 'naive-ui'
import { format } from 'date-fns'

const props = defineProps<{
  modelValue: { min: number; max: number }
  filter: {
    min: number
    max: number
    selected: [number, number]
  }
}>()

const emit = defineEmits(['update:modelValue'])

const internalSelectedRange = ref<[number, number] | null>(null)

const updateRange = (newRange: [number, number] | null) => {
  if (newRange && newRange[0] && newRange[1]) {
    const startYear = new Date(newRange[0]).getFullYear()
    const endYear = new Date(newRange[1]).getFullYear()
    emit('update:modelValue', { min: startYear, max: endYear })
  } else {
    emit('update:modelValue', { min: props.filter.min, max: props.filter.max })
  }
}

const formatDate = (timestamp: number | null) => {
  if (timestamp === null || isNaN(timestamp)) return 'Invalid Date'
  return format(new Date(timestamp), 'yyyy')
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue.min && newValue.max) {
      internalSelectedRange.value = [
        new Date(newValue.min, 0, 1).getTime(),
        new Date(newValue.max, 0, 1).getTime()
      ]
    } else {
      internalSelectedRange.value = null
    }
  },
  { immediate: true }
)

watch(
  () => props.filter.selected,
  (newValue) => {
    if (newValue[0] && newValue[1]) {
      internalSelectedRange.value = [
        new Date(newValue[0], 0, 1).getTime(),
        new Date(newValue[1], 0, 1).getTime()
      ]
    } else {
      internalSelectedRange.value = null
    }
  },
  { deep: true }
)

onMounted(() => {
  if (props.modelValue.min && props.modelValue.max) {
    internalSelectedRange.value = [
      new Date(props.modelValue.min, 0, 1).getTime(),
      new Date(props.modelValue.max, 0, 1).getTime()
    ]
  }
})
</script>
