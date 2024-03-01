<template>
  <div class="">
    <div class="filter-section pb-5 border-b" v-for="filter in filters" :key="filter.title">
      <div class="filter-header font-bold text-lg" @click="toggle(filter)">
        {{ filter.title }}
        <span class="icon">{{ filter.isOpen ? '▼' : '▲' }}</span>
      </div>
      <div v-show="filter.isOpen" class="filter-options pt-2">
        <div v-for="option in filter.options" :key="option.value" class="flex justify-between pb-1">
          <label :for="option.value" class="text-base">{{ option.label }}</label>
          <input
            type="checkbox"
            :id="option.value"
            :value="option.value"
            v-model="selectedOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FilterSection',
  props: {},
  data() {
    return {
      //   isOpen: false,
      selectedOptions: [],
      filters: [
        {
          title: 'category',
          isOpen: true as boolean,
          options: [
            { label: 'Biology', value: 'biology' },
            { label: 'Chemistry', value: 'chemistry' },
            { label: 'History', value: 'history' }
          ]
        },
        {
          title: 'format',
          isOpen: true as boolean,
          options: [
            { label: 'Audiobook', value: 'audiobook' },
            { label: 'Paperback', value: 'paperback' },
            { label: 'eBook', value: 'ebook' }
          ]
        }
      ]
    }
  },
  methods: {
    toggle(filter) {
      filter.isOpen = !filter.isOpen
    }
  }
}
</script>

<style scoped></style>
