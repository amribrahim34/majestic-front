<template>
  <section class="bg-gray-100 py-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">{{ t('home.booksYouMayEnjoy') }}</h2>
      <div v-if="loading" class="text-center">
        <p>{{ t('common.loading') }}</p>
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="book in latestBooks" :key="book.id" class="p-4 bg-white rounded-lg shadow-lg">
          <img
            :src="book.image"
            :alt="book.title"
            class="mb-4 w-full h-40 object-cover rounded-lg"
            loading="lazy"
          />
          <h3 class="text-lg font-bold mb-2">{{ book.title }}</h3>
          <button
            @click="navigateToBookDetails(book.id)"
            class="mt-2 bg-black text-white hover:bg-gray-800 py-2 px-4 rounded transition duration-300"
          >
            {{ t('home.viewDetails') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTypedI18n } from '@/i18n'
import { useBookStore } from '@/stores/bookStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { t } = useTypedI18n()
const router = useRouter()
const bookStore = useBookStore()

const { latestBooks, loading, error } = storeToRefs(bookStore)

onMounted(async () => {
  await bookStore.fetchLatestBooks()
})

const navigateToBookDetails = (bookId: number) => {
  router.push({ name: 'BookDetails', params: { id: bookId } })
}
</script>
