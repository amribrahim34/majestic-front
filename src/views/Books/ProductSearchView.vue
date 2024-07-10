<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="flex w-full my-20">
      <div class="filter-sidebar w-48 ml-7">
        <FilterSection />
      </div>
      <!-- Main content grid -->
      <div class="p-5 mx-10">
        <div class="mb-5">
          <p class="text-xl font-bold">Search results for “Branding”</p>
        </div>
        <div class="gap-3 flex justify-between flex-wrap">
          <ProductCard v-for="book in books" :key="book.id" :book="book" />
        </div>
      </div>
    </div>
    <!-- Load More Button -->
    <!-- <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-4">
      Load More
    </button> -->
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import ProductCard from '@/components/ProductSearch/ProductCard.vue' // Ensure this path is correct
import FilterSection from '@/components/ProductSearch/FilterSection.vue' // Ensure this path is correct
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useBookStore } from '@/stores/bookStore'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'ProductSearchView',
  components: {
    ProductCard,
    FilterSection,
    HeaderComponent,
    FooterComponent
  },
  computed: {
    // Use mapState to map store state to computed properties
    ...mapState(useBookStore, ['books', 'loading', 'error', 'currentBook'])
  },
  methods: {
    ...mapActions(useBookStore, [
      'fetchAllBooks',
      'fetchBookById',
      'fetchBooksByCategory',
      'searchBooks',
      'fetchLatestBooks',
      'fetchBestSellers'
    ])
  },
  created() {
    this.fetchAllBooks()
  }
}
</script>

<style scoped>
/* You can add more styles if needed */
</style>
