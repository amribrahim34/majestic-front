<template>
  <section class="bg-gray-100 py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">{{ t('home.booksYouMayEnjoy') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="book in books" :key="book.id" class="p-4 bg-white rounded-lg shadow-lg">
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 w-full h-40 object-cover rounded-lg"
          />
          <h3 class="text-lg font-bold mb-2">{{ book.title }}</h3>
          <button
            class="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
          >
            {{ t('home.viewDetails') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTypedI18n } from '@/i18n'

const { t } = useTypedI18n()

const books = ref([
  {
    id: 1,
    title: 'Classic Literature',
    image: '/src/assets/books/classic-literature.jpg'
  },
  {
    id: 2,
    title: 'Art and Creativity',
    image: '/src/assets/books/art-creativity.jpg'
  },
  {
    id: 3,
    title: 'Modern Fiction',
    image: '/src/assets/books/modern-fiction.jpg'
  },
  {
    id: 4,
    title: 'Health and Fitness',
    image: '/src/assets/books/health-fitness.jpg'
  },
  {
    id: 5,
    title: 'Science Fiction',
    image: '/src/assets/books/science-fiction.jpg'
  },
  {
    id: 6,
    title: 'Biographies',
    image: '/src/assets/books/biographies.jpg'
  }
])
</script>
