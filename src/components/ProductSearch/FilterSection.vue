<!-- FilterSection.vue -->
<template>
  <div class="filter-section p-10 bg-white shadow-lg">
    <FilterGroup
      v-for="filter in filters"
      :key="filter.title"
      :filter="filter"
      @update:filter="updateFilter"
      @load-more="loadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FilterGroup from './FilterGroup.vue'
import type { Filter } from '@/types/Filter'
import { debounce } from '@/utils/debounce'

const props = defineProps<{
  initialFilters: Record<string, any>
  categories: { id: number; category_name: string; books_count?: number }[]
  formats: string[]
  priceRange: { min: number; max: number }
  yearRange: { min: number; max: number }
}>()

const emit = defineEmits(['filterUpdated'])

const debouncedEmitFilterUpdated = debounce((filters: Record<string, any>) => {
  emit('filterUpdated', filters)
}, 300)

interface RangeFilterType {
  min: number
  max: number
  selected: [number, number] // Add this line
  title: string
  isOpen: boolean
  key: string
  componentType: 'RangeFilter'
}

const filters = ref<Filter[]>([
  {
    title: 'Category',
    isOpen: true,
    componentType: 'CheckboxFilter',
    key: 'category_ids[]',
    options: [],
    selected: [],
    displayLimit: 10,
    totalOptions: 0
  },
  // {
  //   title: 'Book Format',
  //   isOpen: false,
  //   componentType: 'CheckboxFilter',
  //   key: 'formats[]',
  //   options: [],
  //   selected: [],
  //   displayLimit: 10,
  //   totalOptions: 0
  // },
  {
    title: 'Price Range',
    isOpen: true,
    componentType: 'RangeFilter',
    key: 'price_range[]',
    min: 0,
    max: 1000,
    selected: [0, 1000]
  },
  {
    title: 'Publishing Year',
    isOpen: true,
    componentType: 'DateRangeFilter',
    key: 'year_range[]',
    min: 1900,
    max: new Date().getFullYear(),
    selected: [1900, new Date().getFullYear()]
  }
])

const updateFilter = (updatedFilter: Filter) => {
  const index = filters.value.findIndex((f) => f.title === updatedFilter.title)
  if (index !== -1) {
    filters.value[index] = updatedFilter
  }
  debouncedEmitFilterUpdated(getFiltersForAPI())
}

const loadMore = (filterTitle: string) => {
  const filter = filters.value.find((f) => f.title === filterTitle)
  if (filter && filter.componentType === 'CheckboxFilter') {
    filter.displayLimit! += 10
  }
}

const getFiltersForAPI = () => {
  return filters.value.reduce(
    (acc, filter) => {
      if (filter.selected && filter.selected.length > 0) {
        acc[filter.key] = filter.selected
      }
      return acc
    },
    {} as Record<string, any>
  )
}

watch(
  () => props.categories,
  (newCategories) => {
    const categoryFilter = filters.value.find((f) => f.title === 'Category')
    if (categoryFilter && 'options' in categoryFilter) {
      categoryFilter.options = newCategories.map((category) => ({
        value: category.id,
        label: category.category_name,
        books_count: category.books_count
      }))
      categoryFilter.totalOptions = newCategories.length
    }
  },
  { immediate: true }
)

watch(
  () => props.formats,
  (newFormats) => {
    const formatFilter = filters.value.find((f) => f.title === 'Book Format')
    if (formatFilter && 'options' in formatFilter) {
      formatFilter.options = newFormats.map((format) => ({
        value: format,
        label: format
      }))
      formatFilter.totalOptions = newFormats.length
    }
  },
  { immediate: true }
)

watch(
  () => props.priceRange,
  (newPriceRange) => {
    const priceFilter = filters.value.find((f) => f.title === 'Price Range') as
      | RangeFilterType
      | undefined
    if (priceFilter) {
      priceFilter.min = newPriceRange.min
      priceFilter.max = newPriceRange.max
      priceFilter.selected = [newPriceRange.min, newPriceRange.max]
    }
  },
  { immediate: true }
)

watch(
  () => props.yearRange,
  (newYearRange) => {
    const yearFilter = filters.value.find((f) => f.title === 'Year') as RangeFilterType | undefined
    if (yearFilter) {
      yearFilter.min = newYearRange.min
      yearFilter.max = newYearRange.max
      yearFilter.selected = [newYearRange.min, newYearRange.max]
    }
  },
  { immediate: true }
)

watch(
  () => props.initialFilters,
  (newFilters) => {
    filters.value.forEach((filter) => {
      if (newFilters[filter.key]) {
        filter.selected = newFilters[filter.key]
      }
    })
  },
  { immediate: true }
)
</script>
