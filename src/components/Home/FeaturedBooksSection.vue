<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-2">{{ t('home.featuredBooks.title') }}</h2>
      <p class="text-gray-600 mb-8">
        {{ t('home.featuredBooks.description') }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="book in featuredBooks"
          :key="book.id"
          class="bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          <img :src="book.image" :alt="book.title" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ t(book.titleKey) }}</h3>
            <p class="text-gray-600 mb-4">{{ book.price }}</p>
            <button
              class="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-blue-600 transition duration-300"
            >
              {{ t('home.featuredBooks.browseButton') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import antiqueBookImage from '@/assets/home/antique-book.png'
import historicalBookImage from '@/assets/home/historical-book.png'
import pdfBookImage from '@/assets/home/pdf.png'

const { t } = useI18n()

interface Book {
  id: number
  titleKey: string
  title?: string
  price: string
  image: string
}

const featuredBooks = ref<Book[]>([
  {
    id: 1,
    titleKey: 'featuredBooks.antiqueBook',
    price: '£150',
    image: antiqueBookImage
  },
  {
    id: 2,
    titleKey: 'featuredBooks.historicalBook',
    price: '£70',
    image: historicalBookImage
  },
  {
    id: 3,
    titleKey: 'featuredBooks.pdfBook',
    price: '£50',
    image: pdfBookImage
  }
])
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
