<template>
  <div class="filter-section p-10 bg-white shadow-lg">
    <!-- Other filters -->
    <DateRangeFilter
      v-model="selectedYearRange"
      :filter="{ min: yearRange.min, max: yearRange.max, selected: selectedYearRange }"
      @update:modelValue="updateYearRange"
    />
    <CategoryFilter
      v-model="selectedCategories"
      :display-limit="categoryDisplayLimit"
      @load-more="loadMoreCategories"
      @update:modelValue="updateCategory"
    />

    <!-- Price filter -->
    <div class="mb-6">
      <h3 class="font-bold mb-2">{{ t('common.priceRange') }}</h3>
      <PriceFilter
        v-model="selectedPriceRange"
        :min="priceRange.min"
        :max="priceRange.max"
        @update:modelValue="updatePriceRange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CategoryFilter from './Filters/CategoryFilter.vue'
import PriceFilter from './Filters/PriceFilter.vue'
import DateRangeFilter from './Filters/DateRangeFilter.vue'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'
import { debounce } from '@/utils/debounce'

const { t } = useI18n()
const bookStore = useBookStore()
const { categories, priceRange, yearRange } = storeToRefs(bookStore)

const props = defineProps<{
  initialFilters: Record<string, any>
}>()

// const filters = ref([
//   {
//     title: t('common.publishingYear'),
//     key: 'year_range[]',
//     componentType: 'DateRangeFilter',
//     min: yearRange.value.min,
//     max: yearRange.value.max,
//     selected: [yearRange.value.min, yearRange.value.max]
//   }
// ])

const emit = defineEmits<{
  (e: 'filterUpdated', filters: Record<string, any>): void
}>()

const selectedCategories = ref<(string | number)[]>([])
const categoryDisplayLimit = ref(10)
const selectedPriceRange = ref<[number, number]>([
  priceRange.value?.min || 0,
  priceRange.value?.max || 0
])
const minYear = new Date().getFullYear() - 100
const maxYear = new Date().getFullYear()
const selectedYearRange = ref<[number, number]>([
  yearRange.value?.min || minYear,
  yearRange.value?.max || maxYear
])

const loadMoreCategories = () => {
  categoryDisplayLimit.value += 10
}

const updateYearRange = (newRange: { min: number; max: number }) => {
  selectedYearRange.value = [newRange.min, newRange.max]
  emitFilterUpdated('year_range[]', selectedYearRange.value)
}

const updatePriceRange = (newRange: number[]) => {
  selectedPriceRange.value = [newRange[0], newRange[1]]
  emitFilterUpdated('price_range[]', selectedPriceRange.value)
}

const updateCategory = (ids: number[]) => {
  selectedCategories.value = ids
  emitFilterUpdated('category_ids[]', selectedCategories.value)
}

const debouncedEmitFilterUpdated = debounce((filters: Record<string, any>) => {
  emit('filterUpdated', filters)
}, 300)

const previousFilters = ref<Record<string, any>>({})

const emitFilterUpdated = (changedFilterKey: string, value: any) => {
  const updatedFilters: Record<string, any> = {}

  if (JSON.stringify(previousFilters.value[changedFilterKey]) !== JSON.stringify(value)) {
    updatedFilters[changedFilterKey] = value
    previousFilters.value[changedFilterKey] = value
  }

  if (Object.keys(updatedFilters).length > 0) {
    debouncedEmitFilterUpdated(updatedFilters)
  }
}

// watch(
//   [selectedCategories, selectedPriceRange, selectedYearRange],
//   () => {
//     emitFilterUpdated()
//   },
//   { deep: true }
// )

// watch(
//   () => props.initialFilters,
//   (newFilters) => {
//     if (newFilters['category_ids[]']) {
//       selectedCategories.value = newFilters['category_ids[]']
//     }
//     if (newFilters['price_range[]']) {
//       selectedPriceRange.value = newFilters['price_range[]']
//     }
//     if (newFilters['year_range[]']) {
//       selectedYearRange.value = newFilters['year_range[]']
//     }
//   },
//   { immediate: true }
// )

watch(
  () => props.initialFilters,
  (newFilters) => {
    if (newFilters['category_ids[]']) {
      selectedCategories.value = newFilters['category_ids[]']
      previousFilters.value['category_ids[]'] = newFilters['category_ids[]']
    }
    if (newFilters['price_range[]']) {
      selectedPriceRange.value = newFilters['price_range[]']
      previousFilters.value['price_range[]'] = newFilters['price_range[]']
    }
    if (newFilters['year_range[]']) {
      selectedYearRange.value = newFilters['year_range[]']
      previousFilters.value['year_range[]'] = newFilters['year_range[]']
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (categories.value.length === 0) {
    bookStore.fetchCategories()
  }
  if (!priceRange.value?.min || !priceRange.value?.max) {
    bookStore.fetchPriceRange().then(() => {
      selectedPriceRange.value = [priceRange.value.min, priceRange.value.max]
      previousFilters.value['price_range[]'] = selectedPriceRange.value
    })
  }
  previousFilters.value['year_range[]'] = selectedYearRange.value
  previousFilters.value['category_ids[]'] = selectedCategories.value
})
</script>
