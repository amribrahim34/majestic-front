<template>
  <section class="bg-white py-20" :dir="direction">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">{{ t('home.recentlyListed.title') }}</h2>
      <div v-if="loading" class="text-center">
        <p>{{ t('home.recentlyListed.loading') }}</p>
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
            loading="lazy"
          />
          <h3 class="text-lg font-bold mb-2 truncate">{{ book.title }}</h3>
          <p class="text-gray-600 mb-2">{{ formatPrice(book.price) }}</p>
          <button
            @click="viewBookDetails(book.id)"
            class="mt-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
          >
            {{ t('home.recentlyListed.viewDetails') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const bookStore = useBookStore()
const router = useRouter()
const { t, locale } = useI18n()

const { latestBooks, loading } = storeToRefs(bookStore)

const direction = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

onMounted(() => {
  bookStore.fetchLatestBooks()
})

const viewBookDetails = (bookId: number) => {
  router.push(`/books/${bookId}`)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: locale.value === 'ar' ? 'EGP' : 'EGP'
  }).format(price)
}
</script>
