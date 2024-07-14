<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="flex my-20">
      <div class="filter-sidebar w-1/5 ml-7">
        <FilterSection @filter-updated="onFilterUpdated" :initial-filters="getFiltersFromURL()" />
      </div>
      <!-- Main content grid -->
      <div class="p-5 mx-10 w-4/5">
        <div class="mb-5">
          <p class="text-xl font-bold">Search results for “Branding”</p>
        </div>
        <div class="gap-3 flex justify-between flex-wrap">
          <ProductCard v-for="book in books" :key="book.id" :book="book" />
        </div>
        <!-- Pagination -->
        <div class="flex justify-center mt-8">
          <button
            v-for="page in lastPage"
            :key="page"
            @click="setPage(page)"
            :class="[
              'mx-1 px-3 py-2 rounded',
              currentPage === page ? 'bg-black text-white' : 'bg-gray-200'
            ]"
          >
            {{ page }}
          </button>
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
    ...mapState(useBookStore, ['books', 'loading', 'error', 'currentPage', 'lastPage', 'total'])
  },
  methods: {
    ...mapActions(useBookStore, [
      'fetchAllBooks',
      'fetchBookById',
      'fetchBooksByCategory',
      'searchBooks',
      'fetchLatestBooks',
      'fetchBestSellers',
      'setPage'
    ]),
    fetchBooks() {
      const filters = { ...this.$route.query }
      this.fetchAllBooks(this.currentPage, filters)
    },
    getFiltersFromURL() {
      const filters: Record<string, any> = {}
      Object.entries(this.$route.query).forEach(([key, value]) => {
        if (typeof value === 'string') {
          if (key === 'year') {
            filters[key] = value.split(',').map(Number)
          } else if (value.includes(',')) {
            filters[key] = value.split(',')
          } else {
            filters[key] = [value]
          }
        }
      })
      return filters
    },
    onFilterUpdated(filters: Record<string, any>) {
      const query = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value.join(',')
          } else {
            acc[key] = value
          }
          return acc
        },
        {} as Record<string, string>
      )

      this.$router.push({ query })
    }
  },
  watch: {
    '$route.query': {
      handler: 'fetchBooks',
      deep: true
    }
  },
  created() {
    this.fetchBooks()
  }
}
</script>

<style scoped>
/* You can add more styles if needed */
</style>
