<template>
  <div class="related-products">
    <h2 class="text-2xl font-bold mb-4">{{ $t('productInfo.relatedProducts.title') }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="book in books" :key="book.id" class="book-card bg-white rounded-lg shadow-md p-4">
        <img :src="book.image" :alt="book.title" class="w-full h-48 object-cover mb-2 rounded" />
        <h3 class="text-lg font-semibold mb-1">{{ book.title }}</h3>
        <p class="text-gray-700 mb-2">
          {{ $t('productInfo.relatedProducts.price', { price: book.price }) }}
        </p>
        <button
          class="wishlist-button text-2xl focus:outline-none"
          @click="toggleWishlist(book.id)"
        >
          {{ isInWishlist(book.id) ? '♥' : '♡' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { Book } from '@/types/Book'

const props = defineProps({
  books: {
    type: Array as PropType<Book[]>,
    required: true
  }
})

const { t } = useI18n()

const wishlist = ref<Set<number>>(new Set())

const toggleWishlist = (bookId: number) => {
  if (wishlist.value.has(bookId)) {
    wishlist.value.delete(bookId)
  } else {
    wishlist.value.add(bookId)
  }
}

const isInWishlist = (bookId: number): boolean => {
  return wishlist.value.has(bookId)
}
</script>
