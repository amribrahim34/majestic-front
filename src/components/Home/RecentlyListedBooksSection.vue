<template>
  <section class="bg-white py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Recently Listed Books</h2>
      <div v-if="loading" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div
          v-for="book in latestBooks"
          :key="book.id"
          class="p-4 bg-gray-100 rounded-lg shadow-lg"
        >
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 w-full h-40 object-cover rounded-lg"
          />
          <h3 class="text-lg font-bold mb-2 truncate">{{ book.title }}</h3>
          <p class="text-gray-600 mb-2">{{ formatPrice(book.price) }}</p>
          <button
            @click="viewBookDetails(book.id)"
            class="mt-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const bookStore = useBookStore()
const router = useRouter()

const { latestBooks, loading } = storeToRefs(bookStore)

onMounted(() => {
  bookStore.fetchLatestBooks()
})

const viewBookDetails = (bookId: number) => {
  router.push(`/book/${bookId}`)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
</script>
