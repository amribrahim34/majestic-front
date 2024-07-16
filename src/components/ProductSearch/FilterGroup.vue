<!-- FilterGroup.vue -->
<template>
  <div class="pb-5 border-b">
    <div class="filter-header font-bold text-lg cursor-pointer" @click="toggleOpen">
      {{ filter.title }}
      <span class="icon">{{ filter.isOpen ? '▼' : '▲' }}</span>
    </div>
    <div v-if="filter.isOpen" class="filter-options pt-2">
      <component
        :is="componentType"
        :filter="filter"
        :modelValue="filter.selected"
        @update:modelValue="updateFilterValue"
      />
      <button
        v-if="showLoadMore"
        @click="$emit('loadMore', filter.title)"
        class="mt-2 text-blue-500 hover:underline"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CheckboxFilter from './Filters/CheckboxFilter.vue'
import RangeFilter from './Filters/RangeFilter.vue'
import DateRangeFilter from './Filters/DateRangeFilter.vue'

const props = defineProps<{
  filter: {
    title: string
    isOpen: boolean
    componentType: string
    key: string
    options?: Array<{ value: string | number; label: string }>
    selected: any
    displayLimit?: number
    totalOptions?: number
    min?: number
    max?: number
  }
}>()

const emit = defineEmits(['update:filter', 'loadMore'])

const componentType = computed(() => {
  switch (props.filter.componentType) {
    case 'CheckboxFilter':
      return CheckboxFilter
    case 'RangeFilter':
      return RangeFilter
    case 'DateRangeFilter':
      return DateRangeFilter
    default:
      return null
  }
})

const showLoadMore = computed(() => {
  return (
    props.filter.componentType === 'CheckboxFilter' &&
    props.filter.displayLimit &&
    props.filter.totalOptions &&
    props.filter.displayLimit < props.filter.totalOptions
  )
})

const toggleOpen = () => {
  emit('update:filter', { ...props.filter, isOpen: !props.filter.isOpen })
}

const updateFilterValue = (newValue: any) => {
  emit('update:filter', { ...props.filter, selected: newValue })
}
</script>
