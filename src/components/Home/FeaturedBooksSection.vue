<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-2">Featured Books</h2>
      <p class="text-gray-600 mb-8">
        Our books are carefully curated to provide the best reading experience.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="book in featuredBooks"
          :key="book.id"
          class="bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          <img :src="book.image" :alt="book.title" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
            <p class="text-gray-600 mb-4">{{ book.price }}</p>
            <button
              class="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-blue-600 transition duration-300"
            >
              Browse Top Picks
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import antiqueBookImage from '@/assets/home/antique-book.png'
import historicalBookImage from '@/assets/home/historical-book.png'
import pdfBookImage from '@/assets/home/pdf.png'

export default defineComponent({
  name: 'FeaturedBooksSection',
  data() {
    return {
      featuredBooks: [
        {
          id: 1,
          title: 'Antique Book',
          price: '£150',
          image: antiqueBookImage
        },
        {
          id: 2,
          title: 'Historical Book',
          price: '£70',
          image: historicalBookImage
        },
        {
          id: 3,
          title: 'PDF Book',
          price: '£50',
          image: pdfBookImage
        }
      ]
    }
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.text-gray-600 {
  color: #718096;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.hover\:bg-blue-600:hover {
  background-color: #2563eb;
}
</style>
