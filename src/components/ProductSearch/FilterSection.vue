<template>
  <div class="filter-section">
    <div v-for="filter in filters" :key="filter.title" class="pb-5 border-b">
      <div class="filter-header font-bold text-lg cursor-pointer" @click="toggle(filter)">
        {{ filter.title }}
        <span class="icon">{{ filter.isOpen ? '▼' : '▲' }}</span>
      </div>
      <div v-show="filter.isOpen" class="filter-options pt-2">
        <component
          :is="getComponentType(filter)"
          :filter="filter"
          v-model="filter.selected"
          @update:modelValue="updateFilter(filter)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia'
import CheckboxFilter from './Filters/CheckboxFilter.vue'
import RangeFilter from './Filters/RangeFilter.vue'
import DateRangeFilter from './Filters/DateRangeFilter.vue'
import { useBookStore } from '@/stores/bookStore'
import type { Category } from '@/types/Category'
import { defineComponent } from 'vue'
import type { DateRangeFilterType, Filter, RangeFilterType } from '@/types/Filter'

export default defineComponent({
  name: 'FilterSection',

  components: {
    CheckboxFilter,
    RangeFilter,
    DateRangeFilter
  },

  data() {
    return {
      filters: [
        {
          title: 'Category',
          isOpen: true,
          componentType: 'CheckboxFilter',
          options: [],
          selected: []
        },
        {
          title: 'Book Format',
          isOpen: false,
          componentType: 'CheckboxFilter',
          options: [],
          selected: []
        },
        {
          title: 'Price Range',
          isOpen: false,
          componentType: 'RangeFilter',
          min: 0,
          max: 1000,
          selected: [0, 1000]
        },
        {
          title: 'Publishing Year',
          isOpen: false,
          componentType: 'DateRangeFilter',
          min: 1900,
          max: new Date().getFullYear(),
          selected: [1900, new Date().getFullYear()]
        }
      ] as Filter[]
    }
  },

  computed: {
    ...mapState(useBookStore, ['categories', 'formats', 'priceRange', 'yearRange', 'route'])
  },

  methods: {
    ...mapActions(useBookStore, ['fetchAllFilterData', 'updateRouteQuery']),

    toggle(filter: Filter) {
      filter.isOpen = !filter.isOpen
    },

    updateFilter(filter: Filter) {
      console.log(`Filter ${filter.title} updated:`, filter.selected)
      this.updateURL()
      this.emitFilterUpdated()
    },

    getComponentType(filter: Filter) {
      return filter.componentType
    },

    getFiltersForAPI() {
      const apiFilters: Record<string, any> = {}
      this.filters.forEach((filter) => {
        if (filter.selected && filter.selected.length > 0) {
          apiFilters[filter.title.toLowerCase()] = filter.selected
        }
      })
      return apiFilters
    },

    updateURL() {
      const query: Record<string, string> = {}
      this.filters.forEach((filter) => {
        if (filter.selected && filter.selected.length > 0) {
          if (Array.isArray(filter.selected)) {
            query[filter.title.toLowerCase()] = filter.selected.join(',')
          } else {
            query[filter.title.toLowerCase()] = filter.selected.toString()
          }
        }
      })
      this.updateRouteQuery(query)
    },

    emitFilterUpdated() {
      this.$emit('filter-updated', this.getFiltersForAPI())
    },

    updateFiltersFromStore() {
      if (this.categories) {
        this.filters[0].options = this.categories.map((category: Category) => ({
          value: category.id,
          label: category.category_name
        }))
      }
      if (this.formats) {
        this.filters[1].options = this.formats.map((format: string) => ({
          value: format,
          label: format
        }))
      }
      if (this.priceRange) {
        const priceFilter = this.filters[2] as RangeFilterType
        priceFilter.min = this.priceRange.min
        priceFilter.max = this.priceRange.max
        priceFilter.selected = [this.priceRange.min, this.priceRange.max]
      }
      if (this.yearRange) {
        const yearFilter = this.filters[3] as DateRangeFilterType
        yearFilter.min = this.yearRange.min
        yearFilter.max = this.yearRange.max
        yearFilter.selected = [this.yearRange.min, this.yearRange.max]
      }
    }
  },

  watch: {
    route: {
      handler(newRoute) {
        if (newRoute && newRoute.query) {
          this.filters.forEach((filter) => {
            const queryValue = newRoute.query[filter.title.toLowerCase()]
            if (queryValue && typeof queryValue === 'string') {
              if (filter.componentType === 'CheckboxFilter') {
                filter.selected = queryValue.split(',')
              } else if (
                filter.componentType === 'RangeFilter' ||
                filter.componentType === 'DateRangeFilter'
              ) {
                filter.selected = queryValue.split(',').map(Number)
              }
            } else {
              filter.selected =
                filter.componentType === 'CheckboxFilter' ? [] : [filter.min, filter.max]
            }
          })
        }
      },
      immediate: true,
      deep: true
    }
  },

  async mounted() {
    await this.fetchAllFilterData()
    this.updateFiltersFromStore()
  }
})
</script>

<style scoped>
.filter-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.filter-options {
  padding-left: 16px;
}

.icon {
  font-size: 12px;
}
</style>
