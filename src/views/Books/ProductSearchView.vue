<template>
  <div class="container mx-auto">
    <div class="flex">
      <!-- Sidebar Filters Component -->
      <SidebarFilters />
      <!-- Main content grid -->
      <div class="flex-1 grid grid-cols-3 gap-4">
        <ProductCard />
      </div>
    </div>
    <!-- Load More Button -->
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-4">
      Load More
    </button>
  </div>
</template>

<script lang="ts">
import ProductCard from '@/components/ProductSearch/ProductCard.vue' // Ensure this path is correct
import SidebarFilters from '@/components/ProductSearch/SidebarFilters.vue' // Ensure this path is correct

export default {
  name: 'SearchResults',
  components: {
    ProductCard,
    SidebarFilters
  },
  data() {
    return {
      // This would be your data fetched from an API or similar
      items: []
    }
  }
}
</script>

<style scoped>
/* You can add more styles if needed */
</style>
