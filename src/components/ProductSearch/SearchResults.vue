<template>
  <div class="p-5 mx-10 w-4/5">
    <h1 v-if="searchTerm" class="text-xl font-bold mb-5">
      {{ t('common.searchResultsFor', { term: searchTerm }) }}
    </h1>
    <h2 class="text-xl font-bold mb-5">
      {{ t('common.numberOfBooks', { count: total }) }}
    </h2>
    <div class="flex justify-between flex-wrap">
      <ProductCard v-for="book in books" :key="book.id" :book="book" />
    </div>
    <Pagination :current-page="currentPage" :last-page="lastPage" @page-change="onPageChange" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import ProductCard from './ProductCard.vue'
import Pagination from './Pagination.vue'
import type { Book } from '@/types/Book' // Ensure you have this type defined

interface Props {
  books: Book[]
  currentPage: number
  lastPage: number
  total: number
  searchTerm: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const { t } = useI18n()

const onPageChange = (page: number) => {
  emit('pageChange', page)
}
</script>
