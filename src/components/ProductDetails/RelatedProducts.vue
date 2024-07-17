<template>
  <div class="related-products">
    <h2>You might also like</h2>
    <div class="product-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <img :src="book.image" :alt="book.title" />
        <h3>{{ book.title }}</h3>
        <p class="price">${{ book.price }}</p>
        <button class="wishlist-button">♡</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Book } from '@/types/Book'

export default defineComponent({
  name: 'RelatedProducts',
  props: {
    books: {
      type: Array as PropType<Book[]>,
      required: true
    }
  }
})
</script>
