<!-- SearchResults.vue -->
<template>
  <div class="p-5 mx-10 w-4/5">
    <h2 v-if="searchTerm" class="text-xl font-bold mb-5">Search results for "{{ searchTerm }}"</h2>
    <div class="flex justify-between flex-wrap">
      <ProductCard v-for="book in books" :key="book.id" :book="book" />
    </div>
    <Pagination :current-page="currentPage" :last-page="lastPage" @page-change="onPageChange" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ProductCard from './ProductCard.vue'
import Pagination from './Pagination.vue'

defineProps<{
  books: any[]
  currentPage: number
  lastPage: number
  searchTerm: string
}>()

const emit = defineEmits(['pageChange'])

const onPageChange = (page: number) => {
  emit('pageChange', page)
}
</script>
