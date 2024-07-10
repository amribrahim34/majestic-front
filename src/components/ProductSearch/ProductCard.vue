<template>
  <div class="rounded shadow-lg w-96 mb-16">
    <div class="">
      <img class="w-full object-cover h-56" :src="book.image" :alt="book.title" />
    </div>
    <div class="px-5 pb-5">
      <div class="">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ book.title }}
          </h5>
        </a>
        <p>by {{ book.author?.name || 'Unknown Author' }}</p>
      </div>

      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <!-- Star rating SVGs here (you might want to make this dynamic based on a rating property) -->
        </div>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
        >
          {{ book.category?.name || 'Uncategorized' }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">
          {{ formatPrice(book.price) }}
        </span>

        <a
          href="#"
          class="text-white bg-black hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add to cart
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Book } from '@/types/Book'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  },
  methods: {
    formatPrice(price: number | string | undefined): string {
      if (typeof price === 'number') {
        return `LE ${price.toFixed(2)}`
      } else if (typeof price === 'string') {
        const numPrice = parseFloat(price)
        if (!isNaN(numPrice)) {
          return `LE ${numPrice.toFixed(2)}`
        }
      }
      return 'Price not available'
    }
  }
})
</script>

<style scoped>
/* Tailwind CSS does most of the styling. Add any additional custom styles here. */
</style>
