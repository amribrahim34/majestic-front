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
import { defineComponent, ref } from 'vue'
import CheckboxFilter from './Filters/CheckboxFilter.vue'
import RangeFilter from './Filters/RangeFilter.vue'
import DateRangeFilter from './Filters/DateRangeFilter.vue'

export default defineComponent({
  name: 'FilterSection',
  components: {
    CheckboxFilter,
    RangeFilter,
    DateRangeFilter
  },
  setup() {
    const filters = ref([
      {
        title: 'Category',
        isOpen: true,
        componentType: 'CheckboxFilter',
        options: [
          { label: 'Biology', value: 'biology' },
          { label: 'Chemistry', value: 'chemistry' },
          { label: 'History', value: 'history' }
        ],
        selected: []
      },
      {
        title: 'Book Format',
        isOpen: false,
        componentType: 'CheckboxFilter',
        options: [
          { label: 'Audiobook', value: 'audiobook' },
          { label: 'Paperback', value: 'paperback' },
          { label: 'eBook', value: 'ebook' }
        ],
        selected: []
      },
      {
        title: 'Price Range',
        isOpen: false,
        componentType: 'RangeFilter',
        min: 0,
        max: 100,
        selected: [0, 100]
      },
      {
        title: 'Publishing Year',
        isOpen: false,
        componentType: 'DateRangeFilter',
        min: 1900,
        max: new Date().getFullYear(),
        selected: [1900, new Date().getFullYear()]
      }
    ])

    const toggle = (filter) => {
      filter.isOpen = !filter.isOpen
    }

    const updateFilter = (filter) => {
      // Here you can implement the logic to update the parent component or vuex store
      console.log(`Filter ${filter.title} updated:`, filter.selected)
    }

    const getComponentType = (filter) => {
      return filter.componentType
    }

    return {
      filters,
      toggle,
      updateFilter,
      getComponentType
    }
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
