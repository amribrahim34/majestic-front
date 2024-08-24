<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-2">{{ t('home.featuredBooks.title') }}</h2>
      <p class="text-gray-600 mb-8">
        {{ t('home.featuredBooks.description') }}
      </p>
      <div v-if="loading" class="text-center">
        <p>{{ t('common.loading') }}</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="book in bestSellerBooks"
          :key="book.id"
          class="bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          <img
            :src="book.image"
            :alt="book.title"
            class="w-full h-48 object-cover"
            loading="lazy"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
            <p class="text-gray-600 mb-4">{{ formatPrice(book.price) }}</p>
            <button
              @click="viewBookDetails(book.id)"
              class="w-full bg-black text-white py-2 px-4 text-sm font-medium hover:bg-gray-800 transition duration-300"
            >
              {{ t('home.viewDetails') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const bookStore = useBookStore()
const router = useRouter()

const { bestSellerBooks, loading } = storeToRefs(bookStore)

onMounted(() => {
  bookStore.fetchBestSellers()
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

<style scoped>
.container {
  max-width: 1200px;
}
</style>
