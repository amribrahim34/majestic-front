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
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import FilterGroup from './FilterGroup.vue'
import type {
  Filter,
  CheckboxFilterType,
  RangeFilterType,
  DateRangeFilterType
} from '@/types/Filter'
import { debounce } from '@/utils/debounce'

interface Props {
  initialFilters: Record<string, any>
  categories: { id: number; category_name: string; books_count?: number }[]
  formats: string[]
  priceRange: { min: number; max: number }
  yearRange: { min: number; max: number }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'filterUpdated', filters: Record<string, any>): void
}>()

const { t } = useI18n()

const debouncedEmitFilterUpdated = debounce((filters: Record<string, any>) => {
  emit('filterUpdated', filters)
}, 300)

const filters = ref<Filter[]>([
  {
    title: t('common.category'),
    isOpen: true,
    componentType: 'CheckboxFilter',
    key: 'category_ids[]',
    options: [],
    selected: [],
    displayLimit: 10,
    totalOptions: 0
  } as CheckboxFilterType,
  {
    title: t('common.priceRange'),
    isOpen: true,
    componentType: 'RangeFilter',
    key: 'price_range[]',
    min: 0,
    max: 1000,
    selected: [0, 1000]
  } as RangeFilterType,
  {
    title: t('common.publishingYear'),
    isOpen: true,
    componentType: 'DateRangeFilter',
    key: 'year_range[]',
    min: 1900,
    max: new Date().getFullYear(),
    selected: [1900, new Date().getFullYear()]
  } as DateRangeFilterType
])

const updateFilter = (updatedFilter: Filter) => {
  const index = filters.value.findIndex((f) => f.title === updatedFilter.title)
  if (index !== -1) {
    filters.value[index] = updatedFilter
  }
  debouncedEmitFilterUpdated(getFiltersForAPI())
}

const loadMore = (filterTitle: string) => {
  const filter = filters.value.find((f) => f.title === filterTitle) as CheckboxFilterType
  if (filter && filter.componentType === 'CheckboxFilter') {
    filter.displayLimit += 10
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

const updateFilterOptions = (filterTitle: string, newOptions: any[]) => {
  const filter = filters.value.find((f) => f.title === filterTitle) as CheckboxFilterType
  if (filter && 'options' in filter) {
    filter.options = newOptions
    filter.totalOptions = newOptions.length
  }
}

const updateRangeFilter = (filterTitle: string, newRange: { min: number; max: number }) => {
  const filter = filters.value.find((f) => f.title === filterTitle) as RangeFilterType
  if (filter) {
    filter.min = newRange.min
    filter.max = newRange.max
    filter.selected = [newRange.min, newRange.max]
  }
}

watch(
  () => props.categories,
  (newCategories) => {
    console.log('New categories received:', newCategories)
    updateFilterOptions(
      t('common.category'),
      newCategories.map((category) => ({
        value: category.id,
        label: category.category_name,
        books_count: category.books_count
      }))
    )
  },
  { immediate: true }
)

watch(
  () => props.formats,
  (newFormats) => {
    updateFilterOptions(
      t('common.bookFormat'),
      newFormats.map((format) => ({
        value: format,
        label: format
      }))
    )
  },
  { immediate: true }
)

watch(
  () => props.priceRange,
  (newPriceRange) => {
    updateRangeFilter(t('common.priceRange'), newPriceRange)
  },
  { immediate: true }
)

watch(
  () => props.yearRange,
  (newYearRange) => {
    updateRangeFilter(t('common.publishingYear'), newYearRange)
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

onMounted(() => {
  debouncedEmitFilterUpdated(getFiltersForAPI())
})
</script>
