<!-- ProductSearchView.vue -->
<template>
  <div class="container mx-auto">
    <HeaderComponent />
    <div class="flex my-20">
      <div class="filter-sidebar w-1/5 ml-7">
        <FilterSection
          @filter-updated="debouncedOnFilterUpdated"
          :initial-filters="filtersFromURL"
          :categories="categories"
          :formats="formats"
          :price-range="priceRange"
          :year-range="yearRange"
        />
      </div>
      <SearchResults
        :books="books"
        :current-page="currentPage"
        :last-page="lastPage"
        :search-term="searchTerm"
        @page-change="onPageChange"
      />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBookStore } from '@/stores/bookStore'
import FilterSection from '@/components/ProductSearch/FilterSection.vue'
import SearchResults from '@/components/ProductSearch/SearchResults.vue'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { debounce } from '@/utils/debounce'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()

const { books, currentPage, lastPage, categories, formats, priceRange, yearRange } =
  storeToRefs(bookStore)
const { fetchAllBooks, setPage, fetchAllFilterData } = bookStore

const searchTerm = computed(() => (route.query.search as string) || '')

const fetchBooks = async () => {
  try {
    await fetchAllBooks(currentPage.value, route.query)
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const debouncedOnFilterUpdated = debounce((filters: Record<string, any>) => {
  const query = { ...route.query, ...filters }
  const processedQuery = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(',') : value
    ])
  )
  router.push({ query: processedQuery })
}, 300)

const fetchFilters = async () => {
  try {
    await fetchAllFilterData()
  } catch (error) {
    console.error('Error fetching filter data:', error)
  }
}

const filtersFromURL = computed(() => {
  return Object.fromEntries(
    Object.entries(route.query).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, key === 'year_range' ? value.split(',').map(Number) : value.split(',')]
      }
      return [key, value]
    })
  )
})

// const onFilterUpdated = (filters: Record<string, any>) => {
//   const query = Object.fromEntries(
//     Object.entries(filters).map(([key, value]) => [
//       key,
//       Array.isArray(value) ? value.join(',') : value
//     ])
//   )
//   router.push({ query })
// }

const onPageChange = (page: number) => {
  setPage(page)
  router.push({ query: { ...route.query, page } })
  fetchBooks()
}

onMounted(async () => {
  if (route.query.search) {
    bookStore.setSearchQuery(route.query.search as string)
  }
  await fetchFilters()
  await fetchBooks()
})

watch(() => route.query, fetchBooks, { deep: true })

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch) {
      bookStore.setSearchQuery(newSearch as string)
    } else {
      bookStore.setSearchQuery('')
    }
    fetchBooks()
  }
)
</script>
