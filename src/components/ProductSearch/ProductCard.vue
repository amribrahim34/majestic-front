<template>
  <div class="rounded shadow-lg w-96 mb-16">
    <div class="">
      <img class="w-full object-cover h-56" :src="product.img" alt="World History Book" />
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ product.name }}</div>
      <p class="text-gray-700 text-base">@{{ product.author }}</p>
    </div>
    <div class="px-6 py-4 flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-gray-700 text-lg">Current price </span>
        <span class="text-gray-900 text-lg">{{ product.currency }}{{ product.price }}</span>
      </div>
      <button
        class="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        add to cart
      </button>
      <button
        :class="{
          'text-red-500': product.isFavorite,
          'text-gray-600 hover:text-gray-800': !product.isFavorite
        }"
      >
        <svg class="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <!-- Heart icon -->
          <path
            v-if="product.isFavorite"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
          <path
            v-else
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from '@/types/product'
import type { PropType } from 'vue'

export default {
  name: 'ItemCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  }

  // You might want to include props or data if you need to make this component dynamic
}
</script>

<style scoped>
/* Tailwind CSS does most of the styling. Add any additional custom styles here. */
</style>
