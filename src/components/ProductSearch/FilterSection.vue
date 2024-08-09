<template>
  <div class="filter-section" ref="filterSection">
    <!-- Toggle button for mobile -->
    <n-button class="md:hidden mb-4" @click="toggleFilters">
      {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
    </n-button>

    <!-- Filters container -->
    <div v-show="showFilters" class="filter-container md:block">
      <div class="p-4 bg-white shadow-lg">
        <DateRangeFilter
          v-if="yearRange"
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
        <div class="mb-6">
          <h3 class="font-bold mb-2">{{ t('common.priceRange') }}</h3>
          <PriceFilter
            v-model="selectedPriceRange"
            :min="priceRange.min"
            :max="priceRange.max"
            @update:modelValue="updatePriceRange"
          />
        </div>

        <!-- Apply and Reset buttons -->
        <div class="flex justify-between mt-6">
          <n-button @click="resetFilters">Reset Filters</n-button>
          <n-button type="primary" @click="applyFilters">Apply Filters</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import CategoryFilter from './Filters/CategoryFilter.vue'
import PriceFilter from './Filters/PriceFilter.vue'
import DateRangeFilter from './Filters/DateRangeFilter.vue'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'
import { debounce } from '@/utils/debounce'
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const bookStore = useBookStore()
const { categories, priceRange, yearRange } = storeToRefs(bookStore)
const router = useRouter()

const props = defineProps<{
  initialFilters: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'filterUpdated', filters: Record<string, any>): void
}>()

const debouncedResize = debounce(() => {
  if (window.innerWidth >= 768) {
    showFilters.value = true
  }
}, 250)

const showFilters = ref(false)
const filterSection = ref<HTMLElement | null>(null)

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

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const loadMoreCategories = () => {
  categoryDisplayLimit.value += 10
}

const updateYearRange = (newRange: { min: number; max: number }) => {
  if (newRange && typeof newRange.min === 'number' && typeof newRange.max === 'number') {
    selectedYearRange.value = [newRange.min, newRange.max]
  }
}

const updatePriceRange = (newRange: number[]) => {
  if (Array.isArray(newRange) && newRange.length === 2) {
    selectedPriceRange.value = [newRange[0], newRange[1]]
  }
}

const updateCategory = (ids: number[]) => {
  if (Array.isArray(ids)) {
    selectedCategories.value = ids
  }
}

const applyFilters = () => {
  try {
    const updatedFilters: Record<string, any> = {
      'year_range[]': selectedYearRange.value,
      'price_range[]': selectedPriceRange.value,
      'category_ids[]': selectedCategories.value
    }
    emit('filterUpdated', updatedFilters)
    if (window.innerWidth < 768) {
      showFilters.value = false
    }
  } catch (error) {
    console.error('Error applying filters:', error)
  }
}

const resetFilters = () => {
  selectedYearRange.value = [yearRange.value?.min || minYear, yearRange.value?.max || maxYear]
  selectedPriceRange.value = [priceRange.value?.min || 0, priceRange.value?.max || 0]
  selectedCategories.value = []
  // applyFilters()
  router.push({ query: {} })
}

const handleClickOutside = (event: MouseEvent | TouchEvent) => {
  if (filterSection.value && window.innerWidth < 768) {
    const rect = filterSection.value.getBoundingClientRect()
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom

    if (isOutside) {
      showFilters.value = false
    }
  }
}

watch(
  () => props.initialFilters,
  (newFilters) => {
    if (newFilters['category_ids[]']) {
      selectedCategories.value = newFilters['category_ids[]']
    }
    if (newFilters['price_range[]']) {
      selectedPriceRange.value = newFilters['price_range[]']
    }
    if (newFilters['year_range[]']) {
      selectedYearRange.value = newFilters['year_range[]']
    }
  },
  { immediate: true }
)

const handleResize = () => {
  if (window.innerWidth >= 768) {
    showFilters.value = true
  }
}

onMounted(() => {
  if (categories.value.length === 0) {
    bookStore.fetchCategories()
  }
  if (!priceRange.value?.min || !priceRange.value?.max) {
    bookStore.fetchPriceRange().then(() => {
      selectedPriceRange.value = [priceRange.value.min, priceRange.value.max]
    })
  }

  if (window.innerWidth < 768) {
    showFilters.value = false
  }

  document.addEventListener('click', handleClickOutside)

  window.addEventListener('resize', debouncedResize)
  debouncedResize()
  // handleResize()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', debouncedResize)
})
</script>
<style scoped>
.filter-section {
  position: relative;
}

.filter-container {
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .filter-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow-y: auto;
  }

  .filter-container > div {
    max-width: 300px;
    margin: 20px auto;
  }
}
</style>
